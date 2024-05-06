﻿using MassTransit;
using MongoDB.Entities;
using BiddingService.Models;
using Contracts;

namespace BiddingService.Services;

public class CheckAuctionFinished : BackgroundService
{
    private readonly ILogger<CheckAuctionFinished> _logger;
    private readonly IServiceProvider _serviceProvider;

    public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Starting check for finished auctions");

        stoppingToken.Register(() => _logger.LogInformation("==> Auction check is stopping"));

        while (!stoppingToken.IsCancellationRequested)
        {
            await CheckAuctions(stoppingToken);

            await Task.Delay(5000, stoppingToken);
        }
    }

    private async Task CheckAuctions(CancellationToken stoppingToken)
    {
        var finishedAuctions = await DB.Find<Auction>()
            .Match(auction => auction.AuctionEnd <= DateTime.UtcNow)
            .Match(auction => !auction.Finished)
            .ExecuteAsync(stoppingToken);

        if (finishedAuctions.Count == 0)
        {
            return;
        }

        _logger.LogInformation($"==> Found {finishedAuctions.Count} auctions that have completed");

        using var scope = _serviceProvider.CreateScope();

        var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

        foreach (var auction in finishedAuctions)
        {
            auction.Finished = true;

            await auction.SaveAsync(null, stoppingToken);

            var winningBid = await DB.Find<Bid>()
                .Match(bid => bid.AuctionId == auction.ID)
                .Match(bid => bid.BidStatus == BidStatus.Accepted)
                .Sort(builder => builder.Descending(bid => bid.Amount))
                .ExecuteFirstAsync(stoppingToken);

            await endpoint.Publish(new AuctionFinished
            {
                ItemSold = winningBid != null,
                AuctionId = auction.ID,
                Winner = winningBid?.Bidder,
                Amount = winningBid?.Amount,
                Seller = auction.Seller,
            }, stoppingToken);
        }
    }
}
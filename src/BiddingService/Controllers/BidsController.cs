using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using MassTransit;
using MongoDB.Entities;
using BiddingService.DTOs;
using BiddingService.Models;
using BiddingService.Services;
using Contracts;

namespace BiddingService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BidsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly GrpcAuctionClient _grpcAuctionClient;

    public BidsController(IMapper mapper, IPublishEndpoint publishEndpoint, GrpcAuctionClient grpcAuctionClient)
    {
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
        _grpcAuctionClient = grpcAuctionClient;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BidDto>> PlaceBid(string auctionId, int amount)
    {
        var auction = await DB.Find<Auction>().OneAsync(auctionId) ?? _grpcAuctionClient.GetAuction(auctionId);

        if (auction == null)
        {
            return BadRequest("Cannot accept bids on this auction at this time");
        }

        if (auction.Seller == User.Identity?.Name)
        {
            return BadRequest("You cannot bit on your own auction");
        }

        var bidEntity = new Bid
        {
            Amount = amount,
            AuctionId = auctionId,
            Bidder = User.Identity?.Name,
        };

        if (auction.AuctionEnd < DateTime.UtcNow)
        {
            bidEntity.BidStatus = BidStatus.Finished;
        }
        else
        {
            var highBid = await DB.Find<Bid>()
                .Match(bid => bid.AuctionId == auctionId)
                .Sort(builder => builder.Descending(bid => bid.Amount))
                .ExecuteFirstAsync();

            if (highBid != null && amount > highBid.Amount || highBid == null)
            {
                bidEntity.BidStatus = amount > auction.ReservePrice
                    ? BidStatus.Accepted
                    : BidStatus.AcceptedBelowReserve;
            }

            if (highBid != null && bidEntity.Amount <= highBid.Amount)
            {
                bidEntity.BidStatus = BidStatus.TooLow;
            }
        }

        await DB.SaveAsync(bidEntity);

        await _publishEndpoint.Publish(_mapper.Map<BidPlaced>(bidEntity));

        var response = _mapper.Map<BidDto>(bidEntity);

        return Ok(response);
    }

    [HttpGet("{auctionId}")]
    public async Task<ActionResult<List<BidDto>>> GetBidsForAuction(string auctionId)
    {
        var bids = await DB.Find<Bid>()
            .Match(bid => bid.AuctionId == auctionId)
            .Sort(builder => builder.Descending(bid => bid.BidTime))
            .ExecuteAsync();

        var response = bids.Select(_mapper.Map<BidDto>).ToList();

        return Ok(response);
    }
}

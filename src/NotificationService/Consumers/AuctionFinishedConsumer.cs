using Microsoft.AspNetCore.SignalR;
using MassTransit;
using NotificationService.Hubs;
using Contracts;

namespace NotificationService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public AuctionFinishedConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine("==> Auction finished message received");

        await _hubContext.Clients.All.SendAsync("AuctionFinished", context.Message);
    }
}
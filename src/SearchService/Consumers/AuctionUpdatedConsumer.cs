using AutoMapper;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;
using Contracts;

namespace SearchService.Consumers;

public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
{
    private readonly IMapper _mapper;

    public AuctionUpdatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        Console.WriteLine("==> Consuming auction updated: " + context.Message.Id);

        var itemEntity = _mapper.Map<Item>(context.Message);

        var result = await DB.Update<Item>()
            .Match(auction => auction.ID == context.Message.Id)
            .ModifyOnly(item => new
            {
                item.Color,
                item.Make,
                item.Model,
                item.Year,
                item.Mileage
            }, itemEntity)
            .ExecuteAsync();

        if (!result.IsAcknowledged)
        {
            throw new MessageException(typeof(AuctionUpdated), "Problem updating mongodb");
        }
    }
}
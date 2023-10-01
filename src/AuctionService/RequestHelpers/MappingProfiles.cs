using AutoMapper;
using AuctionService.DTOs;
using AuctionService.Entities;

namespace AuctionService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Auction, AuctionDto>().IncludeMembers(x => x.Item);
        CreateMap<Item, AuctionDto>();
        CreateMap<CreateAuctionDto, Auction>()
            .ForMember(destinationMember => destinationMember.Item,
                memberOptions =>
                    memberOptions.MapFrom(mapExpression => mapExpression));
        CreateMap<CreateAuctionDto, Item>();
    }
}
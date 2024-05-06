using AutoMapper;
using SearchService.Models;
using Contracts;

namespace SearchService.RequestHelpers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<AuctionCreated, Item>();
    }
}
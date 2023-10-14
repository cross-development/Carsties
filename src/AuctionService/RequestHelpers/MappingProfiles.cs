﻿using AutoMapper;
using AuctionService.DTOs;
using AuctionService.Entities;
using Contracts;

namespace AuctionService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Auction, AuctionDto>().IncludeMembers(auction => auction.Item);
        CreateMap<Item, AuctionDto>();
        CreateMap<CreateAuctionDto, Auction>()
            .ForMember(auction => auction.Item,
                options =>
                    options.MapFrom(createAuctionDto => createAuctionDto));
        CreateMap<CreateAuctionDto, Item>();
        CreateMap<AuctionDto, AuctionCreated>();
        CreateMap<Auction, AuctionUpdated>().IncludeMembers(auction => auction.Item);
        CreateMap<Item, AuctionUpdated>();
    }
}
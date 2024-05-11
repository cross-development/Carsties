using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using AutoMapper;
using MassTransit;
using AutoFixture;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Controllers;
using AuctionService.Entities;
using AuctionService.RequestHelpers;
using AuctionService.UnitTests.Utils;

namespace AuctionService.UnitTests;

public class AuctionControllerTests
{
    private readonly Mock<IPublishEndpoint> _publishEndpointMock;
    private readonly Mock<IAuctionRepository> _auctionRepoMock;
    private readonly AuctionsController _auctionController;
    private readonly Fixture _fixture;
    private readonly IMapper _mapper;

    public AuctionControllerTests()
    {
        _fixture = new Fixture();
        _auctionRepoMock = new Mock<IAuctionRepository>();
        _publishEndpointMock = new Mock<IPublishEndpoint>();

        var mockMapper = new MapperConfiguration(configuration =>
        {
            configuration.AddMaps(typeof(MappingProfiles).Assembly);
        }).CreateMapper().ConfigurationProvider;

        _mapper = new Mapper(mockMapper);

        _auctionController = new AuctionsController(_auctionRepoMock.Object, _mapper, _publishEndpointMock.Object)
        {
            ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = Helpers.GetClaimsPrincipal() }
            }
        };
    }

    [Fact]
    public async Task GetAuctions_WithNoParams_Returns10Auctions()
    {
        // arrange
        var auctions = _fixture.CreateMany<AuctionDto>(10).ToList();

        _auctionRepoMock.Setup(repository => repository.GetAuctionsAsync(null))
            .ReturnsAsync(auctions);

        // act
        var result = await _auctionController.GetAllAuctions(null);

        // assert
        Assert.Equal(10, result.Value.Count);
        Assert.IsType<ActionResult<List<AuctionDto>>>(result);
    }

    [Fact]
    public async Task GetAuctionById_WithValidGuid_ReturnsAuction()
    {
        // arrange
        var auction = _fixture.Create<AuctionDto>();

        _auctionRepoMock.Setup(repository => repository.GetAuctionByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(auction);

        // act
        var result = await _auctionController.GetAuctionById(auction.Id);

        // assert
        Assert.Equal(auction.Make, result.Value.Make);
        Assert.IsType<ActionResult<AuctionDto>>(result);
    }

    [Fact]
    public async Task GetAuctionById_WithInvalidGuid_ReturnsNotFound()
    {
        // arrange
        _auctionRepoMock.Setup(repository => repository.GetAuctionByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(value: null);

        // act
        var result = await _auctionController.GetAuctionById(Guid.NewGuid());

        // assert
        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task CreateAuction_WithValidCreateAuctionDto_ReturnsCreatedAtAction()
    {
        // arrange
        var auction = _fixture.Create<CreateAuctionDto>();

        _auctionRepoMock.Setup(repository => repository.AddAuction(It.IsAny<Auction>()));
        _auctionRepoMock.Setup(repository => repository.SaveChangesAsync()).ReturnsAsync(true);

        // act
        var result = await _auctionController.CreateAuction(auction);
        var createdResult = result.Result as CreatedAtActionResult;

        // assert
        Assert.NotNull(createdResult);
        Assert.Equal("GetAuctionById", createdResult.ActionName);
        Assert.IsType<AuctionDto>(createdResult.Value);
    }

    [Fact]
    public async Task CreateAuction_FailedSave_Returns400BadRequest()
    {
        // arrange
        var auction = _fixture.Create<CreateAuctionDto>();

        _auctionRepoMock.Setup(repository => repository.AddAuction(It.IsAny<Auction>()));
        _auctionRepoMock.Setup(repository => repository.SaveChangesAsync()).ReturnsAsync(false);

        // act
        var result = await _auctionController.CreateAuction(auction);

        // assert
        Assert.IsType<BadRequestObjectResult>(result.Result);
    }

    [Fact]
    public async Task UpdateAuction_WithUpdateAuctionDto_ReturnsOkResponse()
    {
        // arrange
        var auction = _fixture.Build<Auction>().Without(auction => auction.Item).Create();
        auction.Item = _fixture.Build<Item>().Without(item => item.Auction).Create();
        auction.Seller = "test";

        var updateDto = _fixture.Create<UpdateAuctionDto>();

        _auctionRepoMock.Setup(repository => repository.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(auction);
        _auctionRepoMock.Setup(repository => repository.SaveChangesAsync()).ReturnsAsync(true);

        // act
        var result = await _auctionController.UpdateAuction(auction.Id, updateDto);

        // assert
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task UpdateAuction_WithInvalidUser_Returns403Forbid()
    {
        // arrange
        var auction = _fixture.Build<Auction>().Without(auction => auction.Item).Create();
        auction.Seller = "not-test";

        var updateDto = _fixture.Create<UpdateAuctionDto>();

        _auctionRepoMock.Setup(repository => repository.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(auction);

        // act
        var result = await _auctionController.UpdateAuction(auction.Id, updateDto);

        // assert
        Assert.IsType<ForbidResult>(result);
    }

    [Fact]
    public async Task UpdateAuction_WithInvalidGuid_ReturnsNotFound()
    {
        // arrange
        var auction = _fixture.Build<Auction>().Without(auction => auction.Item).Create();

        var updateDto = _fixture.Create<UpdateAuctionDto>();

        _auctionRepoMock.Setup(repository => repository.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(value: null);

        // act
        var result = await _auctionController.UpdateAuction(auction.Id, updateDto);

        // assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task DeleteAuction_WithValidUser_ReturnsOkResponse()
    {
        // arrange
        var auction = _fixture.Build<Auction>().Without(auction => auction.Item).Create();
        auction.Seller = "test";

        _auctionRepoMock.Setup(repository => repository.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(auction);
        _auctionRepoMock.Setup(repository => repository.SaveChangesAsync()).ReturnsAsync(true);

        // act
        var result = await _auctionController.DeleteAuction(auction.Id);

        // assert
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task DeleteAuction_WithInvalidGuid_Returns404Response()
    {
        // arrange
        var auction = _fixture.Build<Auction>().Without(auction => auction.Item).Create();

        _auctionRepoMock.Setup(repository => repository.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(value: null);

        // act
        var result = await _auctionController.DeleteAuction(auction.Id);

        // assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task DeleteAuction_WithInvalidUser_Returns403Response()
    {
        // arrange
        var auction = _fixture.Build<Auction>().Without(auction => auction.Item).Create();
        auction.Seller = "not-test";

        _auctionRepoMock.Setup(repository => repository.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(auction);

        // act
        var result = await _auctionController.DeleteAuction(auction.Id);

        // assert
        Assert.IsType<ForbidResult>(result);
    }
}
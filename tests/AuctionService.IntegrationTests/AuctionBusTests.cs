﻿using System.Net;
using System.Net.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using MassTransit.Testing;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.IntegrationTests.Utils;
using AuctionService.IntegrationTests.Fixtures;
using Contracts;

namespace AuctionService.IntegrationTests;

[Collection("Shared collection")]
public class AuctionBusTests : IAsyncLifetime
{
    private const string GT_ID = "afbee524-5972-4075-8800-7d1f9d7b0a0c";

    private readonly CustomWebAppFactory _factory;
    private readonly HttpClient _httpClient;
    private readonly ITestHarness _testHarness;

    public AuctionBusTests(CustomWebAppFactory factory)
    {
        _factory = factory;
        _httpClient = factory.CreateClient();
        _testHarness = _factory.Services.GetTestHarness();
    }

    public Task InitializeAsync() => Task.CompletedTask;

    public Task DisposeAsync()
    {
        using var scope = _factory.Services.CreateScope();

        var dbContext = scope.ServiceProvider.GetRequiredService<AuctionDbContext>();

        DbHelper.ReinitDbForTests(dbContext);

        return Task.CompletedTask;
    }

    private CreateAuctionDto GetAuctionForCreate()
    {
        return new CreateAuctionDto
        {
            Make = "test",
            Model = "testModel",
            ImageUrl = "test",
            Color = "test",
            Mileage = 10,
            Year = 2000,
            ReservePrice = 10,
        };
    }

    [Fact]
    public async Task CreateAuction_WithValidObject_ShouldPublishAuctionCreated()
    {
        // arrange
        var auction = GetAuctionForCreate();

        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));

        // act
        var response = await _httpClient.PostAsJsonAsync("api/auctions", auction);

        // assert
        response.EnsureSuccessStatusCode();

        Assert.True(await _testHarness.Published.Any<AuctionCreated>());
    }
}
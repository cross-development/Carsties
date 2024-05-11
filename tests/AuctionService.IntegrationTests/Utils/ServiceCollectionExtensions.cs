using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using AuctionService.Data;

namespace AuctionService.IntegrationTests.Utils;

public static class ServiceCollectionExtensions
{
    public static void RemoveDbContext<T>(this IServiceCollection services)
    {
        var descriptor = services.SingleOrDefault(service =>
            service.ServiceType == typeof(DbContextOptions<AuctionDbContext>));

        if (descriptor != null)
        {
            services.Remove(descriptor);
        }
    }

    public static void EnsureCreated<T>(this IServiceCollection services)
    {
        var serviceProvider = services.BuildServiceProvider();

        using var scope = serviceProvider.CreateScope();

        var dbContext = scope.ServiceProvider.GetRequiredService<AuctionDbContext>();

        dbContext.Database.Migrate();
    }
}
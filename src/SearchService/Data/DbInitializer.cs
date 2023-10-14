using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        await DB.InitAsync("SearchDb", MongoClientSettings
            .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

        await DB.Index<Item>()
            .Key(item => item.Make, KeyType.Text)
            .Key(item => item.Model, KeyType.Text)
            .Key(item => item.Color, KeyType.Text)
            .CreateAsync();

        using var scope = app.Services.CreateScope();

        var httpClient = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();

        var items = await httpClient.GetItemsForSearchDb();

        if (items.Count > 0)
        {
            await DB.SaveAsync(items);
        }
    }
}
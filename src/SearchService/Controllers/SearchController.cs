using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.RequestHelpers;

namespace SearchService.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SearchController : ControllerBase
{
    [HttpGet]
    [Produces(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<List<Item>>> SearchItem([FromQuery] SearchParams searchParams)
    {
        var query = DB.PagedSearch<Item, Item>();

        query.Sort(x => x.Ascending(item => item.Make));

        if (!string.IsNullOrEmpty(searchParams.SearchTerm))
        {
            query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();
        }

        query = searchParams.FilterBy switch
        {
            "finished" => query.Match(item => item.AuctionEnd < DateTime.UtcNow),
            "endingSoon" => query.Match(item => item.AuctionEnd < DateTime.UtcNow.AddHours(6) && item.AuctionEnd > DateTime.UtcNow),
            _ => query.Match(item => item.AuctionEnd > DateTime.UtcNow)
        };

        query = searchParams.OrderBy switch
        {
            "make" => query.Sort(x => x.Ascending(item => item.Make)),
            "new" => query.Sort(x => x.Descending(item => item.CreatedAt)),
            _ => query.Sort(x => x.Ascending(item => item.AuctionEnd))
        };

        if (!string.IsNullOrEmpty(searchParams.Seller))
        {
            query.Match(item => item.Seller == searchParams.Seller);
        }

        if (!string.IsNullOrEmpty(searchParams.Winner))
        {
            query.Match(item => item.Winner == searchParams.Winner);
        }

        query.PageNumber(searchParams.PageNumber);
        query.PageSize(searchParams.PageSize);

        var result = await query.ExecuteAsync();

        return Ok(new
        {
            pageCount = result.PageCount,
            totalCount = result.TotalCount,
            results = result.Results
        });
    }


}

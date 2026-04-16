using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Mapping;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Endpoints;

public static class GenresEndpoints
{
    public static void MapGenresEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/genres");

        group.MapGet("/", async (GameStoreContext dbContext) => 
            await dbContext.Genres
            .Select(genre => genre.ToDto())
            .AsNoTracking()
            .ToListAsync()
            );
    }
}

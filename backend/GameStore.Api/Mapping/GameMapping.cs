using GameStore.Api.Dtos;
using GameStore.Api.Models;

namespace GameStore.Api.Mapping;

public static class GameMapping
{
    public static Game ToEntity(this CreateGameDto game)
    {
        return new Game{
            Name = game.Name,
            GenreId = game.GenreId,
            Price = game.Price,
            ReleaseDate = game.ReleaseDate,
            ImageUrl = game.ImageUrl
        };
    }

    public static GameDetailsDto ToDetailsDto(this Game game)
    {
        return new GameDetailsDto(
            game.Id,
            game.Name,
            game.GenreId,
            game.Price,
            game.ReleaseDate,
            game.ImageUrl
        );
    }

    public static GameSummaryDto ToSummaryDto(this Game game)
    {
        return new GameSummaryDto(
            game.Id,
            game.Name,
            game.Genre?.Name ?? "Unknown",
            game.Price,
            game.ReleaseDate,
            game.ImageUrl
        );
    }

    

}

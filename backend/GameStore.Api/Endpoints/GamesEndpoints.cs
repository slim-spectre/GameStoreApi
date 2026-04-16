using System;
using System.Net.Sockets;
using FluentValidation;
using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Mapping;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Endpoints;

public static class GamesEndpoints
{
    const string GetGameEndpointName = "GetGame";

    public static void MapGamesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/games");

        group.MapGet("/", async (GameStoreContext dbContext) 
        => await dbContext.Games.Include(game => game.Genre).
        Select(game => game.ToSummaryDto())
        .AsNoTracking()
        .ToListAsync());


        group.MapGet("/{id}", async (int id, GameStoreContext dbContext) => {

            var game = await dbContext.Games.FindAsync(id);

            return game is null ? Results.NotFound() : Results.Ok(game.ToDetailsDto());

        }).WithName(GetGameEndpointName);

        group.MapPost("/", async (CreateGameDto newGame, GameStoreContext dbContext, IValidator<CreateGameDto> validator) =>
        {
            var result = await validator.ValidateAsync(newGame);

            if(!result.IsValid) return Results.ValidationProblem(result.ToDictionary());

            Game game = newGame.ToEntity();
            dbContext.Games.Add(game);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute(GetGameEndpointName,new {id = game.Id},game.ToDetailsDto());

        }).RequireAuthorization(new AuthorizeAttribute { AuthenticationSchemes = IdentityConstants.BearerScheme });

        group.MapPut("/{id}", async (int id,
        UpdateGameDto updatedGame,
        GameStoreContext dbContext,
        IValidator<UpdateGameDto> validator) =>
        {

            var result = await validator.ValidateAsync(updatedGame);


            if(!result.IsValid) return Results.ValidationProblem(result.ToDictionary());

            var existingGame = await dbContext.Games.FindAsync(id);

            if(existingGame is null)
            {
                return Results.NotFound();
            }

            existingGame.Name = updatedGame.Name;
            existingGame.GenreId = updatedGame.GenreId;
            existingGame.Price = updatedGame.Price;
            existingGame.ReleaseDate = updatedGame.ReleaseDate;
            existingGame.ImageUrl = updatedGame.ImageUrl;

            await dbContext.SaveChangesAsync();


            return Results.NoContent();

        }).RequireAuthorization(new AuthorizeAttribute { AuthenticationSchemes = IdentityConstants.BearerScheme });


        group.MapDelete("/{id}", async (int id,GameStoreContext dbContext) =>
        {
            await dbContext.Games
                            .Where(game => game.Id == id)
                            .ExecuteDeleteAsync();

            return Results.NoContent(); 
        }).RequireAuthorization(new AuthorizeAttribute { AuthenticationSchemes = IdentityConstants.BearerScheme });
    }
}

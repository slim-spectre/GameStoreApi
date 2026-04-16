using System;
using FluentValidation;
using GameStore.Api.Dtos;

namespace GameStore.Api.Validators;

public class GameDtoValidator<T> : AbstractValidator<T> where T : IGameDto
{
    public GameDtoValidator()
    {
        RuleFor(game => game.Name).NotEmpty().MaximumLength(50);
        RuleFor(name => name.Price).InclusiveBetween(1,100);
        RuleFor(name => name.ReleaseDate).LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.Now));
    }

}

public class CreateGameDtoValidator : GameDtoValidator<CreateGameDto> { }
public class UpdateGameDtoValidator : GameDtoValidator<UpdateGameDto> { }

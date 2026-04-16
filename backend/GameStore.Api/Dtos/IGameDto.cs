namespace GameStore.Api.Dtos;

public interface IGameDto
{
    string Name {get;}

    int GenreId {get;}
    decimal Price{get;}
    DateOnly ReleaseDate {get;}

    string? ImageUrl { get;}
}

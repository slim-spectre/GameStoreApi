using System.ComponentModel.DataAnnotations;

namespace GameStore.Api.Dtos;

public record UserRegistrationDto(
    [Required,StringLength(20,MinimumLength = 3)] string Username,
    [Required,MinLength(8)] string Password,
    [Required,EmailAddress] string Email
);
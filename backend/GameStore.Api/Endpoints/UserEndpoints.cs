using System.Security.Claims;

namespace GameStore.Api;

public static class UserEndpoints
{
    public static RouteGroupBuilder MapUserEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/user");

        group.MapGet("/me", (ClaimsPrincipal user) => 
        {
            var role = user.FindFirstValue(ClaimTypes.Role);
            return Results.Ok(new { Role = role });
        })
        .RequireAuthorization();

        return group;
    }
}
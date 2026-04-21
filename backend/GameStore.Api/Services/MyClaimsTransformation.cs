using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;

namespace GameStore.Api;

public class MyClaimsTransformation : IClaimsTransformation
{
   
    private readonly UserManager<IdentityUser> _userManager;

    public MyClaimsTransformation(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        if(principal.HasClaim(c => c.Type == ClaimTypes.Role) ||
           principal.Identity is not {IsAuthenticated : true })
        {
            return principal;
        }

        var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
        if(userId == null) return principal;

        var user = await _userManager.FindByIdAsync(userId);
        if(user == null) return principal;

        var roles = await _userManager.GetRolesAsync(user);

        var claimsIdentity = new ClaimsIdentity();
        foreach(var role in roles)
        {
            claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, role));
        }

        principal.AddIdentity(claimsIdentity);
        return principal;
    }
}
using bankApI.BusinessLayer.Dto_s.ClientXEmployeeDto_s;
using bankApI.BusinessLayer.Dto_s.TokenDto_s;
using bankApI.BusinessLayer.Services.AuthorizationServer;
using bankApI.Data;
using bankApI.Models.ClientModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bankApI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController(AppDbContext _db,IConfiguration configuration,IAuthorization Auth) : ControllerBase
    {


        [HttpPost("login")]
        public async Task<ActionResult?> Login(DLogin login)
        {
            DTokenInfos? tokenInfos=null;
            if (login.Email.Contains("@Nova.com"))
            {
                tokenInfos = await Auth.CreateEmployeeToken(login);
            }
            else
                tokenInfos = await Auth.CreateClientToken(login);

            if (tokenInfos == null)
                return Unauthorized("Invalid Credentials.");

          /*  Response.Cookies.Append("refreshToken", tokenInfos.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // true in production, false in dev with https
                SameSite = SameSiteMode.Strict, // Or `None` if you're using HTTPS + cross-origin,
                Expires = DateTime.UtcNow.AddDays(7)
            });*/

           
            return Ok(new { token = tokenInfos.AccessToken,refreshtoken=tokenInfos.RefreshToken,account=tokenInfos.Account,type= tokenInfos.type, frozen= tokenInfos.frozen });
        }



        [HttpPut("RefreshTokens/")]
        public async Task<ActionResult> RefreshTokensAsync(RefeshTokenDto infos)
        {
            Console.WriteLine("account" + infos.Account);
            Console.WriteLine("token" + infos.RefreshToken);


            //(!Request.Cookies.TryGetValue("refreshToken", out var refreshToken)))
            if (infos.Account == null ||infos.RefreshToken==null||infos.RefreshToken== string.Empty)
                return Unauthorized("No refresh token provided.");
//||Account==null||Account==string.Empty)*/
           


            var token = await Auth.RefreshTokensAsync(infos.Account,infos.RefreshToken);
            if (token == null)
                return Unauthorized("No refresh.");

          /*  Response.Cookies.Append("refreshToken", token.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // true in production, false in dev with https
                SameSite = SameSiteMode.Strict, // Or `None` if you're using HTTPS + cross-origin,
                Expires = DateTime.UtcNow.AddDays(7)
            });*/

            
            return Ok(new { token = token.AccessToken,refreshtoken=token.RefreshToken });

        }

    }
}
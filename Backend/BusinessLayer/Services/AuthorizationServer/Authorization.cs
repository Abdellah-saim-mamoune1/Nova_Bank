using bankApI.BusinessLayer.Dto_s.ClientXEmployeeDto_s;
using bankApI.BusinessLayer.Dto_s.TokenDto_s;
using bankApI.Data;
using bankApI.Models.ClientModels;
using bankApI.Models.EmployeeModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace bankApI.BusinessLayer.Services.AuthorizationServer
{
    public class Authorization(AppDbContext _db, IConfiguration configuration):IAuthorization
    {


        public async Task<DTokenInfos?> CreateEmployeeToken(DLogin login)
        {

            TokenResponseDto token;
                var employeeInfos = await _db.EmployeeAccount.Include(t => t.Token).
                Include(t=>t.Person).ThenInclude(t=>t.Employee).ThenInclude(t=>t.EmployeeType)
                .FirstOrDefaultAsync(p => p.Account == login.Email);

                if (employeeInfos == null|| employeeInfos?.Person?.Employee?.EmployeeType.Type is null)
                {
                    return null;
                }

                if (new PasswordHasher<EmployeeAccount>().VerifyHashedPassword(employeeInfos,
                    employeeInfos.Password, login.Password)
               == PasswordVerificationResult.Failed)
                {

                    return null;
                }


                token = CreateTokenResponse(employeeInfos.Account, employeeInfos.Person.Employee.EmployeeType.Type);

                employeeInfos.Token.RefreshToken = token.RefreshToken;
                employeeInfos.Token.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _db.SaveChangesAsync();

            DTokenInfos tokenInfos = new DTokenInfos
            {
                AccessToken = token.AccessToken,
                RefreshToken = token.RefreshToken,
                type = "Employee",
                frozen = employeeInfos.IsFrozen,
                Account=employeeInfos.Account
            };

            return tokenInfos;

        }


        public async Task<DTokenInfos?> CreateClientToken(DLogin login)
        {

            TokenResponseDto token;
            var ClientInfos = await _db.Accounts.Include(t => t.token).FirstOrDefaultAsync(p => p.AccountAddress == login.Email);

            if (ClientInfos == null)
            {
                return null;
            }

            if (new PasswordHasher<Account>().VerifyHashedPassword(ClientInfos,
                ClientInfos.PassWord, login.Password)
           == PasswordVerificationResult.Failed)
            {

                return null;
            }


            token = CreateTokenResponse(ClientInfos.AccountAddress, "Client");

            ClientInfos.token.RefreshToken = token.RefreshToken;
            ClientInfos.token.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _db.SaveChangesAsync();

            DTokenInfos tokenInfos = new DTokenInfos
            {
                AccessToken = token.AccessToken,
                RefreshToken = token.RefreshToken,
                type = "Client",
                frozen = ClientInfos.IsFrozen,
                Account=ClientInfos.AccountAddress
            };

            return tokenInfos;

        }



        public async Task<TokenResponseDto?> RefreshTokensAsync(string Account,string RefreshToken)
        {

            DSimpleUser? s;
            if (Account.Contains("@Nova.com"))
                s = await ValidateRefreshTokenAsync(Account,RefreshToken, "Employee");
            else
                s = await ValidateRefreshTokenAsync(Account,RefreshToken, "Client");

            if (s is null || s.Account is null || s.Role is null)
                return null;

            var token = CreateTokenResponse(s.Account, s.Role);

            if (Account.Contains("@Nova.com"))
            {
               var EAccount= await _db.EmployeeAccount.Include(e=>e.Token).FirstOrDefaultAsync(e => e.Account == Account);
                if (EAccount == null)
                    return null;

                EAccount.Token.RefreshToken = token.RefreshToken;  
                EAccount.Token.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
                await _db.SaveChangesAsync();
            }
            else
            {
                var CAccount = await _db.Accounts.Include(e => e.token).FirstOrDefaultAsync(e => e.AccountAddress == Account);
                if (CAccount == null)
                    return null;

                CAccount.token.RefreshToken = token.RefreshToken;
                CAccount.token.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
                await _db.SaveChangesAsync();

            }
                return token;


        }



        private TokenResponseDto CreateTokenResponse(string Account, string Role)
        {
            return new TokenResponseDto
            {
                AccessToken = CreateToken(Account, Role),
                RefreshToken = GenerateRefreshToken()
            };
        }


        private async Task<DSimpleUser?> ValidateRefreshTokenAsync(string Account, string refreshToken, string type)
        {
            if (type == "Employee")
            {
                var EAccount = await _db.EmployeeAccount.Include(t => t.Token).
                    Include(t => t.Person).ThenInclude(t => t.Employee).
                    ThenInclude(t => t.EmployeeType).FirstOrDefaultAsync(e => e.Account == Account);

                if (EAccount is null || EAccount.Token.RefreshToken != refreshToken
                    || EAccount.Token.RefreshTokenExpiryTime < DateTime.UtcNow
                    || EAccount?.Person?.Employee?.EmployeeType.Type is null)
                {
                    return null;
                }

                DSimpleUser s = new DSimpleUser
                {
                    Account = Account,
                    Role = EAccount.Person.Employee.EmployeeType.Type
                };

                return s;
            }
            else
            {
                var CAccount = await _db.Accounts.Include(t=>t.token).FirstOrDefaultAsync(e => e.AccountAddress == Account);
                if (CAccount is null || CAccount.token.RefreshToken != refreshToken
                    || CAccount.token.RefreshTokenExpiryTime < DateTime.UtcNow)
                {
                    return null;
                }

                DSimpleUser s = new DSimpleUser
                {
                    Account = Account,
                    Role = "Client"
                };

                return s;
            }

        }

        public static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }



        private string CreateToken(string Account, string Role)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,Account),
                new Claim(ClaimTypes.Role, Role)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token")!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("AppSettings:Issuer"),
                audience: configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }



    }
}

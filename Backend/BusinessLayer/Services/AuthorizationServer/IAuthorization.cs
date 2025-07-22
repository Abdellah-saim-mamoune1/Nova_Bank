using bankApI.BusinessLayer.Dto_s.ClientXEmployeeDto_s;
using bankApI.BusinessLayer.Dto_s.TokenDto_s;

namespace bankApI.BusinessLayer.Services.AuthorizationServer
{
    public interface IAuthorization
    {
        Task<DTokenInfos?> CreateEmployeeToken(DLogin login);
        Task<DTokenInfos?> CreateClientToken(DLogin login);
        Task<TokenResponseDto?> RefreshTokensAsync(string Account, string RefreshToken);
    }
}

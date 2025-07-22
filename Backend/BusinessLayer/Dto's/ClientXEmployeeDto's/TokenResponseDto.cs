namespace bankApI.BusinessLayer.Dto_s.ClientXEmployeeDto_s
{
    public class TokenResponseDto
    {
        public required string AccessToken { get; set; }
        public required string RefreshToken { get; set; }
    }
}

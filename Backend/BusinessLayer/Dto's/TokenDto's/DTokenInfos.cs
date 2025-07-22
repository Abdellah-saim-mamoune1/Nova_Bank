using bankApI.BusinessLayer.Dto_s.ClientXEmployeeDto_s;

namespace bankApI.BusinessLayer.Dto_s.TokenDto_s
{
    public class DTokenInfos:TokenResponseDto
    {
        public string type { get; set; } = string.Empty;
        public bool frozen { get; set; }
        public string Account { get; set; } = string.Empty;

    }
}

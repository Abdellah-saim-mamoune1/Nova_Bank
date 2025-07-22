using bankApI.Models.ClientModels;
using bankApI.Models.EmployeeModels;

namespace bankApI.Models.ClientXEmployeeModels
{
    public class Token
    {
        public int Id { get; set; }
        public string RefreshToken { get; set; }=string.Empty;
        public DateTime RefreshTokenExpiryTime { get; set; }


        public Account? Account { get; set; }
        public EmployeeAccount? EmployeeAccount { get; set; }

    }
}

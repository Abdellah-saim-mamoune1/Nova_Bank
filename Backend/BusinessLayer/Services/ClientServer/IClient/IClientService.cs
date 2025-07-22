using bankApI.BusinessLayer.Dto_s;
using bankApI.BusinessLayer.Dto_s.ClientDto_s;
using Microsoft.AspNetCore.Mvc;

namespace bankApI.BusinessLayer.Services.SClient.IClient
{
    public interface IClientService
    {
      
        public Task<DPersonClientG> GetClientInfo(string clientId);
        public Task<bool> UpdateClientByIdAsync( DUpdateClient client);
        public Task<bool> AddGetHelpRequistAsync(DCNotifications state);
        public Task<bool> SendClientAccountMessage(DCNotifications Notification);


    }
    
}

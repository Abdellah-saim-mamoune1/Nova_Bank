using bankApI.BusinessLayer.Dto_s;
using bankApI.Data;
using Microsoft.EntityFrameworkCore;
using bankApI.BusinessLayer.Services.SClient.IClient;
using bankApI.Models.ClientModels;
using bankApI.BusinessLayer.Methods;
using bankApI.Models.ClientXEmployeeModels;
using bankApI.BusinessLayer.Services.AuthorizationServer;
using bankApI.Models.EmployeeModels;
using Microsoft.AspNetCore.Identity;


namespace bankApI.BusinessLayer.Services
{
    public class ClientService : IClientService
    {
        private readonly AppDbContext _db;

        public ClientService(AppDbContext db)
        {
            _db = db;
        }


     
        public async Task<bool> UpdateClientByIdAsync(DUpdateClient client)
        { 
            if (client == null)
            {
                return false;
            }

          

            var Client = await _db.Accounts.Include(c=>c.Person).FirstOrDefaultAsync(c => c.AccountAddress == client.AccountId);

            if (Client == null)
            {
                return false;
            }


            if (client.BirthDate != default)
            {
                var today = DateOnly.FromDateTime(DateTime.Today);
                var age = today.Year - client.BirthDate.Year;

                // Adjust if the birthday hasn't happened yet this year
                if (client.BirthDate > today.AddYears(-age))
                {
                    age--;
                }

                if (age < 18)
                {
                    return false;
                }
            }


            Client.Person.FirstName = client.FirstName ?? Client.Person.FirstName;
            Client.Person.LastName = client.LastName ?? Client.Person.LastName;
            Client.Person.PhoneNumber = client.PhoneNumber ?? Client.Person.PhoneNumber;
            Client.Person.BirthDate = client.BirthDate;
            Client.Person.Address = client.Address;
            Client.Person.Email = client.Email ?? Client.Person.Email;
                await _db.SaveChangesAsync();
                return true;
            

           

        }

     public async Task<bool> SendClientAccountMessage(DCNotifications Notification)
        {
            if (Notification == null || Notification.Body == null || Notification.Title == null || Notification.Type <= 0 || Notification.AccountId.Length < 8)
            {

                return false;
            }

            var account = await _db.Accounts.FirstOrDefaultAsync(c => c.AccountAddress == Notification.AccountId);
            if (account == null)
            {
                return false;
            }

            var type = await _db.NotificationsTypes.FirstOrDefaultAsync(c => c.Id == Notification.Type);
            if (type == null)
            {
                return false;
            }

            Notification notification = new Notification { Title = Notification.Title, Body = Notification.Body, TypeId = Notification.Type };
            await _db.Notifications.AddAsync(notification);
            await _db.SaveChangesAsync();

            ClientXNotifications notify = new ClientXNotifications { AccountId = account.Id, NotificationId = notification.Id, Isviewed = false };

            await _db.ClientXNotifications.AddAsync(notify);
            await _db.SaveChangesAsync();
            return true;

        }

      /*  public async Task<bool> SendClientAccountMessage(DCNotifications Notification)
        {
            if (Notification == null || Notification.Body == null || Notification.Title == null || Notification.Type <= 0 || Notification.AccountId.Length < 8)
            {

                return false;
            }

            var account = await _db.Accounts.FirstOrDefaultAsync(c => c.AccountAddress == Notification.AccountId);
            if (account == null)
            {
                return false;
            }

            var type = await _db.NotificationsTypes.FirstOrDefaultAsync(c => c.Id == Notification.Type);
            if (type == null)
            {
                return false;
            }

            Notification notification = new Notification { Title = Notification.Title, Body = Notification.Body, TypeId = Notification.Type };
            await _db.Notifications.AddAsync(notification);
            await _db.SaveChangesAsync();

            ClientXNotifications notify = new ClientXNotifications { AccountId = account.Id, NotificationId = notification.Id, Isviewed = false };

            await _db.ClientXNotifications.AddAsync(notify);
            await _db.SaveChangesAsync();
            return true;

        }*/

        async public Task<bool> AddGetHelpRequistAsync(DCNotifications state)
        {
            if (state == null || state.Body== null || state.Title.Length > 30 || state.Title.Length <= 0 || state.Title == null
                || state.Body.Length <= 0 || state.Body.Length > 400)
                return false;

            var account = await _db.Accounts.FirstOrDefaultAsync(a => a.AccountAddress == state.AccountId);
            if (account == null)
                return false;

            Notification notification = new Notification
            {
                Body="From "+account.AccountAddress+": "+state.Body,
                Title=state.Title,
                TypeId=4,
            };

            await _db.Notifications.AddAsync(notification);
            await _db.SaveChangesAsync();

            var EAccounts = await _db.EmployeeAccount.ToListAsync();

            if (EAccounts != null)
            {
                List<EmployeeNotifications> Enotifications = new List<EmployeeNotifications>();

                foreach (var n in EAccounts)
                {

                    EmployeeNotifications notify = new EmployeeNotifications
                    {
                        AccountId = n.Id,
                        NotificationId = notification.Id,
                        Isviewed = false
                    };

                    Enotifications.Add(notify);

                }

                await _db.EmployeeNotifications.AddRangeAsync(Enotifications);
                await _db.SaveChangesAsync();
            }


            return true;
        }

        async public Task<DPersonClientG?> GetClientInfo(string clientId) { 
        var client = await _db.Accounts.Include(C => C.Person).ThenInclude(C => C.Client).ThenInclude(C => C.Role).Where(C => C.AccountAddress == clientId).Select(c => new DPersonClientG
        {

            Id = c.PersonId,
            FirstName = c.Person.FirstName,
            LastName = c.Person.LastName,
            accountInfo = c.Person.Accounts.Where(a => a.AccountAddress == clientId)
              .Select(a => new DAccountGet
              {
                  AccountId = a.AccountAddress,
                  Balance = a.Balance,
                  IsFrozen = a.IsFrozen,
                  CreatedAt = a.CreatedAt


              }).FirstOrDefault(),
            cardInfo = c.Person.Accounts.Where(a => a.AccountAddress == clientId).Select(c => new DCardGet
            {
                CardNumber = c.Card.CardNumber.ToString().Substring(12, 4),
                ExpirationDate = c.Card.ExpirationDate,

            }).FirstOrDefault(),
            PersonalEmail = c.Person.Email,

            Address = c.Person.Address,
            BirthDate = c.Person.BirthDate,
            PhoneNumber = c.Person.PhoneNumber,
            RoleType = c.Person.Client.Role.Type,
            BankEmails = c.Person.Accounts.Select(a => new DAccountGet
            {
                AccountId = a.AccountAddress,
                Balance = a.Balance,
                IsFrozen = a.IsFrozen,
                CreatedAt = a.CreatedAt


            }).ToList(),

            Cards = c.Person.Accounts.Select(c => new DCardGet
            {
                CardNumber = c.Card.CardNumber.ToString().Substring(12, 4),
                ExpirationDate = c.Card.ExpirationDate,

            }).ToList(),
            IsActive = c.Person.Client.IsActive


        }).FirstOrDefaultAsync();
          

            if (client == null)
                return null;

            return client;
    }

}
}

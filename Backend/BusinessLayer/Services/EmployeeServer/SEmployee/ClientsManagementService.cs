using Azure.Core;
using bankApI.BusinessLayer.Dto_s;
using bankApI.BusinessLayer.Dto_s.EmployeeDto_s;
using bankApI.BusinessLayer.Methods;
using bankApI.BusinessLayer.Services.AuthorizationServer;
using bankApI.BusinessLayer.Services.EmployeeServer.IEmployee;
using bankApI.Data;
using bankApI.Models.ClientManagement;
using bankApI.Models.ClientModels;
using bankApI.Models.ClientXEmployeeModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace bankApI.BusinessLayer.Services.EmployeeServer.SEmployee
{
    public class ClientsManagementService:IClientsManagement
    {
        private readonly AppDbContext _db;

        public ClientsManagementService(AppDbContext db)
        {
            _db = db;
        }
        public async Task<bool> AddNewClientAsync(DPersonClientS cli)
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var age = today.Year - cli.Person.BirthDate.Year;

            // Adjust if the birthday hasn't happened yet this year
            if (cli.Person.BirthDate > today.AddYears(-age))
            {
                age--;
            }


            if (cli == null|| age < 18 ||cli.Person.Email.Length<5||cli.Person.FirstName.Length<2||
                cli.Person.LastName.Length<2||cli.Person.Address.Length<2||
                cli.Account.Balance<1000||cli.Account.PassWord.Length<7)
                
                return false;

            string newId;
            string newcardid;
            do
            {
                newId = GenerateKeys.GenerateId(10);
            }
            while (await _db.Accounts.AnyAsync(c => c.AccountAddress == newId));

            do
            {
                newcardid = GenerateKeys.GenerateNumberId(16);
            }
            while (await _db.Cards.AnyAsync(c => c.CardNumber == newcardid));


            Person person = new Person
            {
                FirstName = cli.Person.FirstName,
                LastName = cli.Person.LastName,
                BirthDate = cli.Person.BirthDate,
                PhoneNumber = cli.Person.PhoneNumber,
                Address = cli.Person.Address,
                Email = cli.Person.Email,
            };
            await _db.Persons.AddAsync(person);
            await _db.SaveChangesAsync();
            Random random = new Random();
            int cvv = random.Next(100, 1000);

            Card card = new Card
            {
                CardNumber = newcardid,
                CVV = cvv,
                ExpirationDate = DateTime.UtcNow.AddYears(1).ToString("MM/yy")

            };

            await _db.Cards.AddAsync(card);
            await _db.SaveChangesAsync();

            string refreshtoken = Authorization.GenerateRefreshToken();
            Token token = new Token
            {
                RefreshToken = refreshtoken,
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)

            };

            await _db.Tokens.AddAsync(token);
            await _db.SaveChangesAsync();

            var hashedPassword = new PasswordHasher<DPersonClientS>()
              .HashPassword(cli, cli.Account.PassWord);

            Account account = new Account
            {
                PersonId = person.Id,
                AccountAddress = newId,
                PassWord = hashedPassword,
                Balance = cli.Account.Balance,
                IsFrozen = false,
                CardId = card.Id,
                TokenId=token.Id,

            };
            await _db.Accounts.AddAsync(account);
            await _db.SaveChangesAsync();




            Client newclient = new Client
            {
                Person = person,
                TypeId = 2,
                IsActive = false

            };

            await _db.Clients.AddAsync(newclient);
            await _db.SaveChangesAsync();


            await _db.SaveChangesAsync();
            return true;

        }


        public async Task<IEnumerable<DPersonClientG>> GetAllClientsAsync()
        {
            var clients = await _db.Clients
    .Include(c => c.Person)
        .ThenInclude(p => p.Accounts)
       .ThenInclude(p => p.Card)
       .Include(c => c.Role)

       .Select(c => new DPersonClientG
       {
           Id = c.PersonId,
           FirstName = c.Person.FirstName,
           LastName = c.Person.LastName,
           PersonalEmail = c.Person.Email,
           Address = c.Person.Address,
           BirthDate = c.Person.BirthDate,
           PhoneNumber = c.Person.PhoneNumber,
           RoleType = c.Role.Type,
           BankEmails = c.Person.Accounts.Select(a => new DAccountGet
           {
               AccountId = a.AccountAddress,
               Balance = a.Balance,
               IsFrozen = a.IsFrozen
           }).ToList(),

           Cards = c.Person.Accounts.Select(a => new DCardGet
           {
               CardNumber = a.Card.CardNumber,
               ExpirationDate = a.Card.ExpirationDate
           }).ToList(),


           IsActive = c.IsActive


       })
       .ToListAsync();


            return clients;
        }

        public async Task<DPersonClientG> GetClientByIdAsync(int id)
        {
            var client = await _db.Clients
          .Include(c => c.Person)

          .Include(c => c.Role)

          .Where(c => c.PersonId == id)
          .Select(c => new DPersonClientG
          {

              Id = c.PersonId,
              FirstName = c.Person.FirstName,
              LastName = c.Person.LastName,
              PersonalEmail = c.Person.Email,
              Address = c.Person.Address,
              BirthDate = c.Person.BirthDate,
              PhoneNumber = c.Person.PhoneNumber,
              RoleType = c.Role.Type,
              BankEmails = c.Person.Accounts.Select(a => new DAccountGet
              {
                  AccountId = a.AccountAddress,
                  Balance = a.Balance,
                  IsFrozen = a.IsFrozen
              }).ToList(),


              IsActive = c.IsActive


          }).FirstOrDefaultAsync();

            return client;

        }



        public async Task<DAccountGet?> AddNewAccountAsync(DBankEmail email)
        {
            if (email == null || email.InitialBalance < 1000 || email.InitialBalance > 1000000
                || string.IsNullOrWhiteSpace(email.PassWord) || email.PassWord.Length < 7)
                return null;

            var person = await _db.Accounts.Include(C => C.Person).Where(p => p.AccountAddress == email.CurrentAccount).FirstOrDefaultAsync();
            if (person == null)
                return null;
            var t = await _db.Persons.Include(c => c.Accounts).Where(r => r.Id == person.Person.Id).FirstOrDefaultAsync();
            Console.WriteLine(t?.Accounts.Count);
            if (person.Person.Accounts == null || t?.Accounts.Count > 6)
                return null;



            Random random = new Random();
            int cvv = random.Next(100, 1000);

            string newId;
            string newcardid;
            do
            {
                newId = GenerateKeys.GenerateId(10);
            }
            while (await _db.Accounts.AnyAsync(c => c.AccountAddress == newId));

            do
            {
                newcardid = GenerateKeys.GenerateNumberId(16);
            }
            while (await _db.Cards.AnyAsync(c => c.CardNumber == newcardid));



            Card card = new Card
            {
                CardNumber = newcardid,
                CVV = cvv,
                ExpirationDate = DateTime.UtcNow.AddYears(1).ToString("MM/yy")

            };

            await _db.Cards.AddAsync(card);
            await _db.SaveChangesAsync();


            string refreshtoken = Authorization.GenerateRefreshToken();
            Token token = new Token
            {
                RefreshToken = refreshtoken,
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)

            };

            await _db.Tokens.AddAsync(token);
            await _db.SaveChangesAsync();


            var hashedPassword = new PasswordHasher<DBankEmail>()
            .HashPassword(email, email.PassWord);

            Account account = new Account
            {
                PersonId = person.Person.Id,
                AccountAddress = newId,
                PassWord = hashedPassword,
                Balance = email.InitialBalance,
                IsFrozen = false,
                CardId = card.Id,
                TokenId = token.Id

            };


            await _db.Accounts.AddAsync(account);
            await _db.SaveChangesAsync();
            DateOnly date = new DateOnly();
            DAccountGet info = new DAccountGet
            {
                AccountId = account.AccountAddress,
                Balance = account.Balance,
                IsFrozen = false,
                CreatedAt = date
            };

            Notification notif = new Notification
            {
                Body = "The new account is " + account.AccountAddress + " with the password: " + account.PassWord,
                Title = "New account",
                TypeId = 4

            };

            await _db.Notifications.AddAsync(notif);
            await _db.SaveChangesAsync();
            ClientXNotifications notification = new ClientXNotifications
            {
                AccountId = person.Id,
                NotificationId = notif.Id,
                Isviewed = false


            };

            await _db.ClientXNotifications.AddAsync(notification);
            await _db.SaveChangesAsync();

            return info;
        }



        public async Task<IEnumerable<DGetEmails>> GetAllClientsAccountsAsync()
        {
            var Emails = await _db.Accounts.Include(c => c.Person).Select(c => new DGetEmails
            {
                Id = c.Id,
                FirstName = c.Person.FirstName,
                LastName = c.Person.LastName,
                Email = c.AccountAddress,
                Balance = c.Balance,
                IsFrozen = c.IsFrozen,
                PersonId = c.PersonId
            }).ToListAsync();

            return Emails;

        }
        public async Task<bool> FreezeClientAccountAsync(DSetEmailState state)
        {

            if (state.state != "Activate" && state.state != "DisActivate" || state.AccountId.Length <= 4)
                return false;

            var c = await _db.Accounts.FirstOrDefaultAsync(d => d.AccountAddress == state.AccountId);
            if (c == null)
                return false;

            if (state.state == "DisActivate")
                c.IsFrozen = true;
            else
                c.IsFrozen = false;


            await _db.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Deposit(DDepositWithdraw depositinfos)
        {
            if (depositinfos == null || depositinfos.ClientAccount==null|| depositinfos.Amount<1000
                || depositinfos.Amount > 100000)
                return false;

            try
            {
                var clientaccount = await _db.Accounts.FirstOrDefaultAsync(c => c.AccountAddress == depositinfos.ClientAccount);
                var employeeaccount = await _db.EmployeeAccount.FirstOrDefaultAsync(e => e.Account == depositinfos.EmployeeAccount);

                if (clientaccount == null || employeeaccount == null)
                {
                    Console.WriteLine("no");
                    return false;

                }
                clientaccount.Balance += depositinfos.Amount;
                var deposit = new TransactionsRegistre
                {
                    ClientAccountId = clientaccount.Id,
                    EmployeeAccountId = employeeaccount.Id,
                    Amount = depositinfos.Amount,
                    type="deposit"

                };
                var transactions = new TransactionsHistory
                {
                    AccountId = clientaccount.Id,
                    TypeId = 2,
                    Amount = depositinfos.Amount,


                };
                await _db.TransactionsHistory.AddAsync(transactions);
                await _db.TransactionsRegistres.AddAsync(deposit);
                _db.SaveChanges();
                return true;
            }
            catch
            {
                Console.WriteLine("yes error");
                return false;
            }


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



        public async Task<bool> Withdraw(DDepositWithdraw withdrawinfos)
        {
            if (withdrawinfos == null || withdrawinfos.ClientAccount == null || withdrawinfos.Amount == null || withdrawinfos.Amount < 1000
                || withdrawinfos.Amount > 1000000)
                return false;

            try
            {
                var clientaccount = await _db.Accounts.FirstOrDefaultAsync(c => c.AccountAddress == withdrawinfos.ClientAccount);
                var employeeaccount = await _db.EmployeeAccount.FirstOrDefaultAsync(e => e.Account == withdrawinfos.EmployeeAccount);

                if (clientaccount == null ||clientaccount.Balance<withdrawinfos.Amount|| employeeaccount == null)
                    return false;


                clientaccount.Balance -= withdrawinfos.Amount;
                var deposit = new TransactionsRegistre
                {
                    ClientAccountId = clientaccount.Id,
                    EmployeeAccountId = employeeaccount.Id,
                    Amount = withdrawinfos.Amount,
                    type = "withdraw"

                };
                var transactions = new TransactionsHistory
                {
                    AccountId = clientaccount.Id,
                    TypeId = 1,
                    Amount = withdrawinfos.Amount,


                };
                await _db.TransactionsHistory.AddAsync(transactions);
                await _db.TransactionsRegistres.AddAsync(deposit);
                _db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }


        }

    }
}

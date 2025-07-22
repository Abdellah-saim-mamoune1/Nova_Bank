﻿using bankApI.BusinessLayer.Dto_s;
using bankApI.BusinessLayer.Dto_s.EmployeeDto_s;
using Microsoft.AspNetCore.Mvc;

namespace bankApI.BusinessLayer.Services.EmployeeServer.IEmployee
{
    public interface IClientsManagement
    {
        public Task<bool> AddNewClientAsync(DPersonClientS client);
        public Task<bool> SendClientAccountMessage(DCNotifications Notification);
        public Task<bool> FreezeClientAccountAsync(DSetEmailState state);
        public Task<IEnumerable<DGetEmails>> GetAllClientsAccountsAsync();
       // public Task<ActionResult<IEnumerable<DGetEmails>>> GetAllAccountsAsync();
        public Task<DAccountGet?> AddNewAccountAsync(DBankEmail email);
        public Task<IEnumerable<DPersonClientG>> GetAllClientsAsync();
        public Task<DPersonClientG> GetClientByIdAsync(int id);
      //  public Task<ActionResult> AddClientNotification(DCNotifications n);
        public Task<bool> Deposit(DDepositWithdraw depositinfos);
        public Task<bool> Withdraw(DDepositWithdraw withdrawinfos);
    }
}

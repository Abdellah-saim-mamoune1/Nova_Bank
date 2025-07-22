using bankApI.BusinessLayer.Dto_s;
using bankApI.BusinessLayer.Dto_s.EmployeeDto_s;
using bankApI.BusinessLayer.Services.EmployeeServer.IEmployee;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bankApI.Controllers.EmployeeController
{
    [Authorize(Roles = "Admin,Cashier")]
    [Route("api/[controller]")]
    [ApiController]
    public class ManageClientsController : ControllerBase
    {

        IClientsManagement _ManageClientService;


        public ManageClientsController(IClientsManagement ManageClientService)
        {
            _ManageClientService = ManageClientService;

        }

     
        [HttpPost("AddNewClient")]
        public async Task<ActionResult> AddNewClientAsync([FromBody] DPersonClientS client)
        {
            bool check = await _ManageClientService.AddNewClientAsync(client);
            if (check)
                return Ok();
            else
                return BadRequest();

        }

       
      


        [HttpGet("GetAllClients")]
        public async Task<ActionResult<IEnumerable<DPersonClientG>>> GetAllClientsAsync()
        {

            var result = await _ManageClientService.GetAllClientsAsync();
            if (result == null)
            {
                return NoContent();
            }

            return Ok(result);
        }


        [HttpGet("GetClientById{id}")]
        public async Task<ActionResult<DPersonClientG>> GetClientByIdAsync(int id)
        {
            var result = await _ManageClientService.GetClientByIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpGet("GetAllClientsAccounts")]
        public async Task<ActionResult<IEnumerable<DGetEmails>>> GetAllAccountsAsync()
        {

            var result = await _ManageClientService.GetAllClientsAccountsAsync();
            if (result == null)
            {
                return NoContent();
            }

            return Ok(result);
        }

       
        [HttpPost("AddAccount")]
        public async Task<ActionResult<DAccountGet?>> AddNewAccountAsync([FromBody] DBankEmail email)
        {
            var check = await _ManageClientService.AddNewAccountAsync(email);
            if (check == null)
                return BadRequest();

            else
                return Ok(check);

        }

        [HttpPost("AddClientNotification")]
        async public Task<ActionResult> AddClientNotification(DCNotifications n)
        {
            bool result = await _ManageClientService.SendClientAccountMessage(n);
            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut("FreezeUnfreezeClientAccount")]
        public async Task<ActionResult> FreezeUnfreezeClientAccountAsync(DSetEmailState state)
        {
            bool result = await _ManageClientService.FreezeClientAccountAsync(state);
            if (result)
                return Ok();
            else
                return NotFound();
        }

      
        [HttpPost("Deposit")]
        public async Task<ActionResult> Deposit(DDepositWithdraw depositinfos)
        {
            bool result = await _ManageClientService.Deposit(depositinfos);
            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }


      /*  [HttpPost("SendMessageToClientAccount")]
        public async Task<ActionResult> SendMessageToClientAccount([FromBody] DBankEmail email)
        {
            var check = await _ManageClientService.AddNewAccountAsync(email);
            if (check != null)
                return Ok();
            else
                return BadRequest();
        }*/


        [HttpPost("Withdraw")]
        public async Task<ActionResult> Withdraw(DDepositWithdraw withdrawinfos)
        {
            bool result = await _ManageClientService.Withdraw(withdrawinfos);
            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

    }
}

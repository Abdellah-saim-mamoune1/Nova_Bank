using bankApI.BusinessLayer.Dto_s;
using bankApI.BusinessLayer.Services.SClient.IClient;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace bankApI.Controllers.ClientController
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        IClientService _ClientService;

        public ClientController(IClientService ClientService)
        {
            _ClientService = ClientService;
            
        }

      
        [HttpPut("UpdateClient/")]
        public async Task<ActionResult> UpdateClientByIdAsync( [FromBody] DUpdateClient client)
        {
            bool a = await _ClientService.UpdateClientByIdAsync( client);
            if (a)
            {
                return Ok();
            }

            else
                return NotFound();

        }


        [HttpPost("AddClientNotification")]
        async public Task<ActionResult> AddClientNotification(DCNotifications n)
        {
            bool result = await _ClientService.SendClientAccountMessage(n);
            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }


        [HttpPost("AddGetHelpRequist/")]
        async public Task<ActionResult> AddGetHelpRequistAsync(DCNotifications state)
        {
            bool response = await _ClientService.AddGetHelpRequistAsync(state);

            if (response)
                return Ok("Requist Added Successfuly");

            return BadRequest("Unvalid Requist");
        }


        [HttpGet("GetClientInfo")]
        public async Task<ActionResult<DPersonClientG>> GetClientInfo()
        {
            var clientId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (clientId == null)
                return Unauthorized();

            var clientinfos = await _ClientService.GetClientInfo(clientId);
            if (clientinfos == null)
                return NotFound();

            return Ok(clientinfos);
        }


    }
}

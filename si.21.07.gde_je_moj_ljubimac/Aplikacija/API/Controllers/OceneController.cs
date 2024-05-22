using System.Threading.Tasks;
using Application.Ocene;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OceneController : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> AddOcena([FromForm]Ocena ocena)
        {
            return HandleResult(await Mediator.Send(new AddOcena.Command {Ocena=ocena})); 
        }
    }
}
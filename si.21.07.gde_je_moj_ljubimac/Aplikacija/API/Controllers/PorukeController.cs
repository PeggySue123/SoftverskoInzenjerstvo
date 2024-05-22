using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Poruke;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PorukeController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Poruka>>> GetPoruke()
        {
            return HandleResult(await Mediator.Send(new GetPoruke.Query()));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Poruka>> GetPoruka(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetPorukaByID.Query{Id=id}));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreatePoruka(Create.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePoruka(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePoruka(string id, Poruka poruka)
        {
            poruka.Id= id;
            return HandleResult(await Mediator.Send(new Update.Command{Poruka=poruka}));
        }

        [AllowAnonymous]
        [HttpGet("seeallmessages")]
        public async Task<ActionResult<Poruka>> SeeAllMessages(string korisnikId)
        {
            return HandleResult(await Mediator.Send(new SeeAllMessages.Query{KorisnikId=korisnikId}));
        }
    }
}
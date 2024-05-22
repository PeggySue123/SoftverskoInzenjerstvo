using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Korisnici;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KorisniciController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<GetKorisnici.KorisniciEnvelope>> GetKorisnici(int? limit, int? offset)
        {
            return await Mediator.Send(new GetKorisnici.Query(limit, offset));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetKorisnik(string id)
        {
            return HandleResult(await Mediator.Send(new GetKorisnikByID.Query { Id = id }));
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKorisnik(string id, [FromForm]Korisnik korisnik)
        {
            korisnik.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { Korisnik = korisnik }));
        }

        [AllowAnonymous]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteKorisnik(string username)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Username = username }));
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromForm]Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromForm]Register.Command command)
        {
            command.Origin = Request.Headers["origin"];
            await Mediator.Send(command);
            return Ok("Registracija uspesna - molimo Vas proverite Vas email");
        }

        [AllowAnonymous]
        [HttpGet("current")]
        public async Task<ActionResult<User>> GetCurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }

        [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(ConfirmEmail.Command command)
        {
            var result = await Mediator.Send(command);
            if(!result.Succeeded) throw new System.Exception("Problem pri potvrdjivanju email adrese");
            return Ok("Email je potvrdjen - Mozete se logovati!");
        }

        [AllowAnonymous]
        [HttpGet("resendEmailVerification")]
        public async Task<IActionResult> ResendEmailVerification([FromQuery] ResendEmailVerification.Query query)
        {
            query.Origin = Request.Headers["origins"];
            await Mediator.Send(query);

            return Ok("Email verification link sent - please check email");
        }

        [AllowAnonymous]
        [HttpPut("deactivate")]
        public async Task<IActionResult> DeactivateKorisnik(Deactivate.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [AllowAnonymous]
        [HttpPut("activate")]
        public async Task<IActionResult> ActivateKorisnik(Activate.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
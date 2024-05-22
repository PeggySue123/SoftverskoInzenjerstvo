using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Slike;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SlikeController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Slika>>> GetSlike()
        {
            return HandleResult(await Mediator.Send(new GetSlike.Query()));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Slika>> GetSlika(string id)
        {
            return HandleResult(await Mediator.Send(new GetSlikaByID.Query{Id=id}));
        }
        
        [AllowAnonymous]
        [HttpDelete("{delete}")]
        public async Task<IActionResult> DeleteSlika(string idOglas, string idSlike)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{IdOglasa=idOglas, IdSlike=idSlike}));
        }
    }
}
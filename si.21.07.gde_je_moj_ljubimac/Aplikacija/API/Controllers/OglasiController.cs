using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Helpers;
using Application.Oglasi;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OglasiController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<GetOglasi.OglasiEnvelope>> GetOglasi(int? limit, int? offset, [FromQuery]string tip)
        {
            return await Mediator.Send(new GetOglasi.Query(limit, offset, tip));
        }
        
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Oglas>> GetOglas(string id)
        {
            Helper.CurrentPath = HttpContext.Request.Path.Value;
            return HandleResult(await Mediator.Send(new GetOglasByID.Query{Id=id}));
        }
        //  [AllowAnonymous]
        // [HttpGet("/oglas")]
        // public async Task<ActionResult<Oglas>> GetOglas(string oglasid)
        // {
        //     Helper.CurrentPath = HttpContext.Request.Path.Value;
        //     return HandleResult(await Mediator.Send(new GetOglasByID.Query{Id=oglasid}));
        // }
        [AllowAnonymous]
        [HttpGet("tipoglasa")]
        public async Task<ActionResult<Oglas>> GetOglasByType(string tip)
        {
            return HandleResult(await Mediator.Send(new GetOglasByType.Query{tip_Oglasa=tip}));
        }
        
        [AllowAnonymous]
        [HttpGet("poautoru")]
        public async Task<ActionResult<Oglas>> GetOglasByAutor(string AutorId)
        {
            return HandleResult(await Mediator.Send(new GetOglasByAutor.Query{autorId=AutorId}));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateOglas([FromForm] List<IFormFile> file,[FromForm] Oglas oglas )
        {
            return HandleResult(await Mediator.Send(new Create.Command {File=file, Oglas=oglas})); 
        }

        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> UpdateOglas([FromForm]Oglas oglas)
        {
            return HandleResult(await Mediator.Send(new Update.Command{Oglas=oglas}));
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOglas(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
        
        [AllowAnonymous]
        [HttpPut("{dodajslike}")]
        public async Task<IActionResult> AddSlikeOglasu([FromForm] string oglasId, [FromForm] List<IFormFile> file)
        {
            return HandleResult(await Mediator.Send(new AddSlikeOglasu.Command {File=file, OglasId=oglasId})); 
        }
    }
}
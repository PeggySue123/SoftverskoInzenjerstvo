using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Ocene
{
    public class AddOcena
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Ocena Ocena { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Ocena.KorisnikId).NotEmpty();
                RuleFor(x => x.Ocena.OcenaValue).NotEmpty().InclusiveBetween(1, 5);
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly UserManager<Korisnik> _userManager;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, UserManager<Korisnik> userManager, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var logkorisnik = await _userManager.FindByNameAsync(_userAccessor.GetCurrenUsername());

                if(logkorisnik == null) return null;

                request.Ocena.OcenioId = logkorisnik.Id;
                request.Ocena.Id = Guid.NewGuid().ToString();

               var stara= _context.Ocene.FirstOrDefault(x=>x.OcenioId == logkorisnik.Id&&x.KorisnikId == request.Ocena.KorisnikId);
    if(stara!=null){
        _context.Ocene.Remove(stara);
        _context.SaveChanges();
    }
                _context.Ocene.Add(request.Ocena);

                var korisnik = _context.Korisnici.Include(o => o.Ocene).FirstOrDefault(x => x.Id == request.Ocena.KorisnikId);

                korisnik.Ocene.Add(request.Ocena);

                var lista = new List<Ocena>();

                lista = korisnik.Ocene;

                int pom = 0;

                foreach (var o in lista)
                {
                    pom += o.OcenaValue;
                }

                pom = pom / lista.Count();

                korisnik.Ocena = pom;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to add ocena");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
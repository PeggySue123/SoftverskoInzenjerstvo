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

namespace Application.Korisnici
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Username { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Username).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly UserManager<Korisnik> _userManager;
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, UserManager<Korisnik> userManager, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var admin = await _userManager.FindByNameAsync(_userAccessor.GetCurrenUsername());

                if(admin == null) return Result<Unit>.Failure("Greska! Niste logovani!");

                var korisnik = _context.Korisnici.Include(o => o.Oglasi).FirstOrDefault(x => x.UserName == request.Username);

                if(korisnik == null) return Result<Unit>.Failure("Username korisnika koji zelite da obrisete ne postoji!");

                if (admin.Tip_korisnika == 0) // Ako je korisnik koji zahteva brisanje korisnika administrator onda dozvoli brisanje korisnika po username-u
                {
                    var oglasi = new List<Oglas>();
                    oglasi = korisnik.Oglasi;
                    foreach (var o in oglasi)
                    {
                        _context.Oglasi.Remove(o);

                    }
                    _context.Remove(korisnik);

                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result<Unit>.Failure("Failed to delete korisnik");
                    
                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Nemate pravo brisanja korisnika!");
            }
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Oglasi
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public List<IFormFile> File { get; set; }
            public Oglas Oglas { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Oglas).SetValidator(new OglasValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly UserManager<Korisnik> _userManager;
            private readonly DataContext _context;
            private readonly ISlikaAccessor _slikaAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, UserManager<Korisnik> userManager, ISlikaAccessor slikaAccessor, IUserAccessor userAccessor)
            {
                _userManager = userManager;
                _userAccessor = userAccessor;
                _slikaAccessor = slikaAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Oglasi.Add(request.Oglas);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Greska prilikom dodavanja oglasa");

                var oglas = await _context.Oglasi.Include(o => o.Slike).FirstOrDefaultAsync(x => x.Id == request.Oglas.Id);

                if (oglas == null) return null;

                if (request.File.Count != 0)
                {
                    var slikeUploadResult = await _slikaAccessor.AddPhoto(request.File);

                    var slike = new List<Slika>();

                    foreach (var slika in slikeUploadResult)
                    {
                        var novaSlika = new Slika
                        {
                            Url = slika.Url,
                            Id = slika.PublicId,
                        };

                        slike.Add(novaSlika);
                        oglas.Slike.Add(novaSlika);
                    }

                    slike[0].isMain = true;

                    _context.Slike.AddRange(slike);

                    result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result<Unit>.Failure("Greska prilikom dodavanja slike oglasu");

                }
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrenUsername());

                oglas.KorisnikId = user.Id;
                
                user.Oglasi.Add(oglas);

                var success = await _context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Greska prilikom dodavanja oglasa korisniku");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
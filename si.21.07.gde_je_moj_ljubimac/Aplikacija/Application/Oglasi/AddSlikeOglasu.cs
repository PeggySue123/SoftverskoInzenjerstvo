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
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Oglasi
{
    public class AddSlikeOglasu
    {
         public class Command : IRequest<Result<Unit>>
        {
            public List<IFormFile> File { get; set; }
            public string OglasId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly ISlikaAccessor _slikaAccessor;
            public Handler(DataContext context, ISlikaAccessor slikaAccessor)
            {
                _slikaAccessor = slikaAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.File.Count != 0)
                {
                    var oglas = await _context.Oglasi.Include(o => o.Slike).FirstOrDefaultAsync(x => x.Id == request.OglasId);

                    if (oglas == null) return null;

                    var slikeUploadResult = await _slikaAccessor.AddPhoto(request.File);

                    var slike = new List<Slika>();

                    foreach (var slika in slikeUploadResult)
                    {
                        slike.Add(new Slika
                        {
                            Url = slika.Url,
                            Id = slika.PublicId,
                        });
                    }

                    foreach (var sl in slike)
                    {
                        oglas.Slike.Add(sl);
                    }

                    _context.Slike.AddRange(slike);

                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result<Unit>.Failure("Greska prilikom dodavanja slike oglasu");

                    return Result<Unit>.Success(Unit.Value);

                }
                return Result<Unit>.Failure("Greska! Niste odabrali nijednu sliku");
            }
        }
    }
}
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Slike
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string IdOglasa { get; set; }
            public string IdSlike { get; set; }
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
                var oglas = await _context.Oglasi.Include(s => s.Slike)
                    .FirstOrDefaultAsync(x => x.Id == request.IdOglasa);

                if (oglas == null) return null;

                var slika = oglas.Slike.FirstOrDefault(x => x.Id == request.IdSlike);

                if (slika == null) return null;
                
                if (slika.isMain == false)
                {
                    var result = await _slikaAccessor.DeletePhoto(slika.Id);

                    if (result == null) return Result<Unit>.Failure("Problem prilikom brisanja slike sa Cloudinary-a");

                    oglas.Slike.Remove(slika);

                    var success = await _context.SaveChangesAsync() > 0;

                    if (!success) return Result<Unit>.Failure("Failed to delete slika");

                    return Result<Unit>.Success(Unit.Value);
                }
                return Result<Unit>.Failure("Ne mozete obrisati glavnu sliku");
            }
        }
    }
}
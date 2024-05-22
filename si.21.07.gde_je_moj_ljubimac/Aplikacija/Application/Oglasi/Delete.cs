using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Oglasi
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
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
                var oglas = _context.Oglasi.Include(s => s.Slike).FirstOrDefault(x => x.Id == request.Id);

                if (oglas == null) return null;

                var slike = new List<Slika>();
                slike = oglas.Slike;

                if(slike == null) return null;
                
                foreach (var slika in slike)
                {
                    var result = await _slikaAccessor.DeletePhoto(slika.Id);

                    if(result == null) return Result<Unit>.Failure("Problem prilikom brisanja slike sa Cloudinary-a");

                    _context.Slike.Remove(slika);
                }

                _context.Remove(oglas);

                var success = await _context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Failed to delete oglas");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
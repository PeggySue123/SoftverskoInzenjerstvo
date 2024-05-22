using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Korisnici
{
    public class GetKorisnikByID
    {
        public class Query : IRequest<Result<Korisnik>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Korisnik>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Korisnik>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<Korisnik>.Success(await _context.Korisnici.Include(o => o.Oglasi).ThenInclude(x=>x.Slike).FirstOrDefaultAsync(x => x.Id == request.Id));
            }
        }

    }
}
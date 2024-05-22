using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Oglasi
{
    public class GetOglasByAutor
    {
        public class Query : IRequest<Result<List<Oglas>>>
        {
            public string autorId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Oglas>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Oglas>>> Handle(Query request, CancellationToken cancellationToken)
            {     
                return Result<List<Oglas>>.Success(await _context.Oglasi.Include(s => s.Slike).Where(x => x.KorisnikId == request.autorId).ToListAsync(cancellationToken));
            }
        }
    }
}
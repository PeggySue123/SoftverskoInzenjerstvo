using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Korisnici
{
    public class GetKorisnici
    {

        public class KorisniciEnvelope
        {
            public List<Korisnik> Korisnici { get; set; }
            public int BrojKorisnika { get; set; }
        }

        public class Query : IRequest<KorisniciEnvelope>
        {
            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }
        public class Handler : IRequestHandler<Query, KorisniciEnvelope>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<KorisniciEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Korisnici
                    .OrderBy(x => x.Ocena)
                    .AsQueryable();

                var korisnici = await queryable
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 3).ToListAsync();

                return new KorisniciEnvelope
                {
                    Korisnici = await _context.Korisnici.Include(o => o.Oglasi).Include(oc => oc.Ocene).ToListAsync(cancellationToken),
                    BrojKorisnika = queryable.Count()
                };
            }
        }
    }
}
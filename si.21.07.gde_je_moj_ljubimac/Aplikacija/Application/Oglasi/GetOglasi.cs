using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;

namespace Application.Oglasi
{
    public class GetOglasi
    {

        public class OglasiEnvelope
        {
            public List<Oglas> Oglasi { get; set; }
            public int OglasBroj { get; set; }
        }
        public class Query : IRequest<OglasiEnvelope>
        {
            public Query(int? limit, int? offset, string tip)
            {
                Limit = limit;
                Offset = offset;
                Tip = tip;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public string Tip { get; set; }
        }

        public class Handler : IRequestHandler<Query, OglasiEnvelope>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<OglasiEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Oglasi
                    //.Where(x => x.Tip_Oglasa == request.Tip)
                    .OrderBy(x => x.DateTime)
                    .AsQueryable();
                    if(!string.IsNullOrWhiteSpace(request.Tip)&& request.Tip != "all"){
                        queryable = queryable.Where(x=>x.Tip_Oglasa == request.Tip);
                    }

                var oglasi = await queryable
                .Include(s=>s.Slike)
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 3).ToListAsync();

                return new OglasiEnvelope
                {
                    Oglasi = oglasi,//await _context.Oglasi.Include(s => s.Slike).ToListAsync(cancellationToken),
                    OglasBroj = queryable.Count()
                };
            }
        }
    }
}
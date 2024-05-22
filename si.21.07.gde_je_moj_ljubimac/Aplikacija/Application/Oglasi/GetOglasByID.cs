using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Oglasi
{
    public class GetOglasByID
    {
         public class Query : IRequest<Result<Oglas>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Oglas>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Oglas>> Handle(Query request, CancellationToken cancellationToken)
            {           
                return Result<Oglas>.Success(await _context.Oglasi.Include(s => s.Slike)
                    .FirstOrDefaultAsync(x => x.Id == request.Id));
            }
        }
    }
}
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Slike
{
    public class GetSlike
    {
        public class Query : IRequest<Result<List<Slika>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Slika>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Slika>>> Handle(Query request, CancellationToken cancellationToken)
            {
               return Result<List<Slika>>.Success(await _context.Slike.ToListAsync(cancellationToken));
            }
        }
    }
}
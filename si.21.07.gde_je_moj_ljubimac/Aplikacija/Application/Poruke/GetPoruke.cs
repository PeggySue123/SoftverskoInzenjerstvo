using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Poruke
{
    public class GetPoruke
    {
        public class Query : IRequest<Result<List<Poruka>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Poruka>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Poruka>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Poruka>>.Success(await _context.Poruke.ToListAsync());
            }
        }
    }
}
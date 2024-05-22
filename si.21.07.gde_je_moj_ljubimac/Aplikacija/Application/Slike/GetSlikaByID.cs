using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Slike
{
    public class GetSlikaByID
    {
        public class Query : IRequest<Result<Slika>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Slika>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Slika>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<Slika>.Success(await _context.Slike.FindAsync(request.Id));
            }
        }
    }
}
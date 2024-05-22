using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Poruke
{
    public class GetPorukaByID
    {
        public class Query : IRequest<Result<Poruka>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Poruka>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Poruka>> Handle(Query request, CancellationToken cancellationToken)
            {
                 return Result<Poruka>.Success(await _context.Poruke.FindAsync(request.Id));
            }
        }
    }
}
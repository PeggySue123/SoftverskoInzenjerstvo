using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Oglasi
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Oglas Oglas { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Oglas).SetValidator(new OglasValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var oglas = _context.Oglasi.Include(s => s.Slike).FirstOrDefault(x => x.Id == request.Oglas.Id);

                if(oglas == null) return null;

                _mapper.Map(request.Oglas, oglas);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update oglas");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
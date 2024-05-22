using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Poruke
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Poruka Poruka { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Poruka).SetValidator(new PorukaValidator());
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
                var poruka = await _context.Poruke.FindAsync(request.Poruka.Id);
                
                if(poruka==null) return null;

                _mapper.Map(request.Poruka, poruka);

                var reslut = await _context.SaveChangesAsync() > 0;

                if(!reslut) return Result<Unit>.Failure("Failed to update slika");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
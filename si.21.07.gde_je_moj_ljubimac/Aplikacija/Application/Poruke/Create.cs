using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Poruke
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Poruka Poruka { get; set; }
            public List<string> Ids { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Poruka).SetValidator(new PorukaValidator());
                RuleFor(x => x.Ids).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly UserManager<Korisnik> _userManager;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, UserManager<Korisnik> userManager, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var posiljalac = await _userManager.FindByNameAsync(_userAccessor.GetCurrenUsername());

                if(posiljalac == null) return null;

                _context.Poruke.Add(request.Poruka);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create slika");

                foreach(var id in request.Ids)
                {
                    Chat chat = new Chat
                    {
                        PorukaId = request.Poruka.Id,
                        PosiljalacId = posiljalac.Id,
                        PrimalacId = id
                    };
                    _context.Chats.Add(chat);
                }
                var success = await _context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Failed to add chats");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
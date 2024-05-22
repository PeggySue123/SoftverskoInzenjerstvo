using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Korisnici
{
    public class Deactivate
    {
        public class Command : IRequest<Result<Unit>> { }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly UserManager<Korisnik> _userManager;
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, UserManager<Korisnik> userManager, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrenUsername());

                user.Status_naloga = 2; // deaktiviran

                var success = await _context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Greska prilikom deaktiviranja korisnika");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
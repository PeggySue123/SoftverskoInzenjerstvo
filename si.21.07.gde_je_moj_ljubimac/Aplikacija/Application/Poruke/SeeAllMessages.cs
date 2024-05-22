using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Poruke
{
    public class SeeAllMessages
    {
        public class Query : IRequest<Result<List<Poruka>>>
        {
            public string KorisnikId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Poruka>>>
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
            public async Task<Result<List<Poruka>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var korisnik = await _userManager.FindByNameAsync(_userAccessor.GetCurrenUsername());

                if(korisnik == null) return null;

                List<Poruka> poruke = _context.Chats.Include(x => x.Poruka)
                .Where(x => (x.PosiljalacId == request.KorisnikId && x.PrimalacId == korisnik.Id) 
                || (x.PrimalacId == request.KorisnikId && x.PosiljalacId == korisnik.Id))
                .Select(x => x.Poruka).ToList();

                return Result<List<Poruka>>.Success(poruke);
            }
        }
    }
}
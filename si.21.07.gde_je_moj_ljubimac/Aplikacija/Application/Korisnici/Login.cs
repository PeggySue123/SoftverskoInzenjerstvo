using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Korisnici
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<Korisnik> _userManager;
            private readonly SignInManager<Korisnik> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly DataContext _context;

            public Handler(DataContext context, UserManager<Korisnik> userManager, SignInManager<Korisnik> signInManager,
            IJwtGenerator jwtGenerator)
            {
                _context = context;
                _jwtGenerator = jwtGenerator;
                _signInManager = signInManager;
                _userManager = userManager;

            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null) return null;

                if (!user.EmailConfirmed) throw new System.Exception("Email nije potvrdjen");

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    if (user.Status_naloga == 0)
                    {
                        user.Status_naloga = 1; // Postavlja status naloga na 1(aktivan/potvrdjen) za prvi login

                        var success = await _context.SaveChangesAsync() > 0;

                        if (!success) throw new System.Exception("Greska prilikom promene baze.");
                    }
                    
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        Username = user.UserName,
                        UserId = user.Id
                    };
                }

                throw new System.Exception("Nevalidan password!");

            }
        }
    }
}
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Korisnici
{
    public class Register
    {
        public class Command : IRequest
        {
            [Required]
            public string DisplayName { get; set; }
            public string Adresa { get; set; }
            [Required]
            public string Username { get; set; }
            [Required]
            [EmailAddress]
            public string Email { get; set; }
            [Required]
            [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$", ErrorMessage = "Password mora biti složen!")]
            public string Password { get; set; }
            public string Origin { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<Korisnik> _userManager;
            private readonly IEmailSender _emailSender;
            public Handler(DataContext context, UserManager<Korisnik> userManager, IEmailSender emailSender)
            {
                _emailSender = emailSender;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Korisnici.AnyAsync(x => x.Email == request.Email))
                    throw new System.Exception("Email vec postoji!");

                if (await _context.Korisnici.AnyAsync(x => x.UserName == request.Username))
                    throw new System.Exception("Username vec postoji");

                var user = new Korisnik
                {
                    DisplayName = request.DisplayName,
                    Adresa = request.Adresa,
                    Ocena = 0,
                    Status_naloga = 0, // nepotvrdjen
                    Tip_korisnika = 1, // registrovani korisnik
                    Email = request.Email,
                    EmailConfirmed = true,
                    UserName = request.Username
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (!result.Succeeded) throw new System.Exception("Problem pri kreiranju korisnika");

                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

                var verifyUrl = $"{request.Origin}/user/verifyEmail?token={token}&email={request.Email}";

                var message = $"<p>Molim Vas kliknite na link ispod da biste potvrdili Vasu email adresu:</p><p><a href='{verifyUrl}'>{verifyUrl}></a></p>";

                await _emailSender.SendEmailAsync(request.Email, "Molim Vas potvrdite vasu email adresu", message);

                return Unit.Value;

                // if(result.Succeeded)
                // {
                //     return new User
                //     {
                //         DisplayName= user.DisplayName,
                //         Token = _jwtGenerator.CreateToken(user),
                //         Username = user.UserName,
                //         Image = null
                //     };
                // }

                // throw new System.Exception("Problem pri kreiranju korisnika");
            }
        }
    }
}
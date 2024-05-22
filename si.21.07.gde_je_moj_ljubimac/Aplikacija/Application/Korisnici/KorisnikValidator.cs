using Domain;
using FluentValidation;

namespace Application.Korisnici
{
    public class KorisnikValidator : AbstractValidator<Korisnik>
    {
        public KorisnikValidator()
        {
            RuleFor(x => x.DisplayName).NotEmpty().MaximumLength(45);
            RuleFor(x => x.Status_naloga).NotEmpty().NotNull().InclusiveBetween(0,2); // 0 nije potvrdjen, 1 aktivan/potvrdjen, 2 deaktiviran
            //RuleFor(x => x.Tip_korisnika).NotEmpty().NotNull().InclusiveBetween(0,1); // 0 je administrator, 1 registrovani korisnik
            RuleFor(x => x.UserName).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
        }
    }
}
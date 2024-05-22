using Domain;
using FluentValidation;

namespace Application.Oglasi
{
    public class OglasValidator : AbstractValidator<Oglas>
    {
        public OglasValidator()
        {
            RuleFor(x => x.Naslov).NotEmpty().MaximumLength(50);
            RuleFor(x => x.Opis).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Vrsta).NotEmpty().MaximumLength(10);
            RuleFor(x => x.Rasa).NotEmpty().MaximumLength(20);
            RuleFor(x => x.Pol).NotEmpty().MaximumLength(1);
            RuleFor(x => x.Tip_Oglasa).NotEmpty().MaximumLength(10);
        }
    }
}
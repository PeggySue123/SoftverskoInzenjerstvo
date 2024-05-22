using Domain;
using FluentValidation;

namespace Application.Slike
{
    public class SlikaValidator : AbstractValidator<Slika>
    {
        public SlikaValidator()
        {
            RuleFor(x => x.Url).NotEmpty();
        }
    }
}
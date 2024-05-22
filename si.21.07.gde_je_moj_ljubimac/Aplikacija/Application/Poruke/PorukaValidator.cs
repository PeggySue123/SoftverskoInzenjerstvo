using Domain;
using FluentValidation;

namespace Application.Poruke
{
    public class PorukaValidator : AbstractValidator<Poruka>
    {
        public PorukaValidator()
        {
            RuleFor(x => x.UserName).NotEmpty().MaximumLength(15);
            RuleFor(x => x.Text).NotEmpty().MaximumLength(1000);
        }
    }
}
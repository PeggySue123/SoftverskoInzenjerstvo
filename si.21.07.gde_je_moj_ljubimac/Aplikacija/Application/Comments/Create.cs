using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Text { get; set; }
            public string OglasId { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Text).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var oglas = await _context.Oglasi.FindAsync(request.OglasId);

                if(oglas == null) return null;

                var korisnik = await _context.Korisnici.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrenUsername());
                
                if(korisnik == null) return null;

                var comment = new Comment
                {
                    Autor = korisnik,
                    AutorId = korisnik.Id,
                    Oglas = oglas,
                    OglasId = oglas.Id,
                    Text = request.Text
                };

                oglas.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));

                return Result<CommentDto>.Failure("Greska prilikom dodavanja komentara");
            }
        }


    }
}
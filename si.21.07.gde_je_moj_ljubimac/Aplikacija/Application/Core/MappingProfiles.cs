using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Korisnik, Korisnik>();
            CreateMap<Oglas, Oglas>();
            CreateMap<Poruka,Poruka>();
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Autor.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Autor.UserName));
                
        }
    }
}
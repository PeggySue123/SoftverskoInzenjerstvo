using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Slike;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface ISlikaAccessor
    {
        Task<List<SlikaUploadResult>> AddPhoto(List<IFormFile> files);
        Task<string> DeletePhoto(string publicId);
    }
}
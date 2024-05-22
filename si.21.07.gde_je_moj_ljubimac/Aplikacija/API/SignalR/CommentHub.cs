using System.Net.Http;
using System.Threading.Tasks;
using API.Helpers;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class CommentHub : Hub
    {
        private readonly IMediator _mediator;
        public CommentHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediator.Send(command);

            await Clients.Group(command.OglasId)
                .SendAsync("ReceiveComment", comment.Value);

        }

        public override async Task OnConnectedAsync()
        {
            // var httpContext = Context.GetHttpContext();
            // var pom = httpContext.Request.Query["oglasid"];
            string currentUrl = Helper.CurrentPath;
            var oglasId = currentUrl.Split("/api/oglasi/")[1];
            await Groups.AddToGroupAsync(Context.ConnectionId, oglasId);
            var result = await _mediator.Send(new List.Query{ OglasId = oglasId });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}
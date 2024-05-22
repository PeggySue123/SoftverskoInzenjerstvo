using System;

namespace Application.Comments
{
    public class CommentDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Text { get; set; }
        public string AutorId { get; set; }
        public string OglasId { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        
    }
}
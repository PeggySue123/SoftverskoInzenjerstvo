using System;

namespace Domain
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public Korisnik Autor { get; set; }
        public string AutorId { get; set; }
        public Oglas Oglas { get; set; }
        public string OglasId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
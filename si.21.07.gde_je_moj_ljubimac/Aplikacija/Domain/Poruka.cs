using System;

namespace Domain
{
    public class Poruka
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Text { get; set; }
        public DateTime Vreme { get; set; } = DateTime.Now;
    }
}
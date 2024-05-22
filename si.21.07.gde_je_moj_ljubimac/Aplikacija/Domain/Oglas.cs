using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Oglas
    {
        public string Id { get; set; }
        public string Naslov { get; set; }
        public DateTime DateTime { get; set; } = DateTime.UtcNow;
        public string Opis { get; set; }
        public string Lokacija { get; set; }
        public string Vrsta { get; set; }
        public string Rasa { get; set; }
        public string Pol { get; set; }
        public string Boja { get; set; }
        public string Tip_Oglasa { get; set; }
        public float? Starost { get; set; }
        public bool? Vakcinisan { get; set; }
        public bool? Sterilisan { get; set; }
        public bool? Papiri  { get; set; }
        public string KorisnikId { get; set; }
        public List<Slika> Slike { get; set; } = new List<Slika>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class Korisnik : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Adresa { get; set; }
        public int? Ocena { get; set; }
        public int Status_naloga { get; set; }
        public int Tip_korisnika { get; set; }
        public List<Oglas> Oglasi { get; set; } = new List<Oglas>();
        public List<Ocena> Ocene { get; set; } = new List<Ocena>();
    }
}
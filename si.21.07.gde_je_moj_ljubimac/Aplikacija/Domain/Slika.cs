using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Slika
    {
        public string Id { get; set; }
        public string Url { get; set; } 
        public bool isMain { get; set; }
    }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Chat
    {
        public int Id { get; set; }
        public string PorukaId { get; set; }
        [ForeignKey("PorukaId")]
        public Poruka Poruka { get; set; }
        [ForeignKey("PosiljalacId")]
        public Korisnik Posiljalac { get; set; }
        [ForeignKey("PrimalacId")]
        public Korisnik Primalac { get; set; }
        public string PosiljalacId { get; set; }
        public string PrimalacId { get; set; }
        
    }
}
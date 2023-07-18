namespace webapi.Models
{
    public class Ronda
    {
        public int Id { get; set; }

        public int RoundNumber { get; set; }

        public string P1Move { get; set; }

        public string P2Move { get; set;}

        public string? RoundResult { get; set; }

        public int PartidaId { get; set; }

        public Partida? Partida { get; set; } 
    }
}

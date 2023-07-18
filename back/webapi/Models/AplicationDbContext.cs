//Esta clase nos permite crear la BBDD y poder trabajar con ella

using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
    public class AplicationDbContext: DbContext //Decimos que la clase AplicationDbContext va a heredar la clas DbContext de EF Core
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options) 
        {
                
        }

        public DbSet<Partida> Partidas { get; set; }

        public DbSet<Ronda> Rondas { get; set; }

}
}

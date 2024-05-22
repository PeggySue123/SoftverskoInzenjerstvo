using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<Korisnik>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Oglas>()
                .HasMany(dm => dm.Slike)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Korisnik>()
                .HasMany(o => o.Oglasi)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Korisnik>()
                .HasMany(o => o.Ocene)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Comment>()
                .HasOne(o => o.Oglas)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(modelBuilder);

        }

        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Oglas> Oglasi { get; set; }
        public DbSet<Slika> Slike { get; set; }
        public DbSet<Poruka> Poruke { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Ocena> Ocene { get; set; }
        public DbSet<Chat> Chats { get; set; }
    }
}
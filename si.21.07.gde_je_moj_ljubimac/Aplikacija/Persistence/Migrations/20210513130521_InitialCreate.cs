using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Korisnici",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Licno_Ime = table.Column<string>(type: "TEXT", nullable: true),
                    Prezime = table.Column<string>(type: "TEXT", nullable: true),
                    Adresa = table.Column<string>(type: "TEXT", nullable: true),
                    Opstina = table.Column<string>(type: "TEXT", nullable: true),
                    Lozinka = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Ocena = table.Column<int>(type: "INTEGER", nullable: false),
                    Status_naloga = table.Column<int>(type: "INTEGER", nullable: false),
                    Tip_korisnika = table.Column<int>(type: "INTEGER", nullable: false),
                    Korisnicko_Ime = table.Column<string>(type: "TEXT", nullable: true),
                    Security_Question = table.Column<string>(type: "TEXT", nullable: true),
                    Security_Answer = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnici", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Korisnici");
        }
    }
}

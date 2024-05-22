using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class OglasCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Oglasi",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Naslov = table.Column<string>(type: "TEXT", nullable: true),
                    DateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Opis = table.Column<string>(type: "TEXT", nullable: true),
                    Lokacija = table.Column<string>(type: "TEXT", nullable: true),
                    Vrsta = table.Column<string>(type: "TEXT", nullable: true),
                    Rasa = table.Column<string>(type: "TEXT", nullable: true),
                    Pol = table.Column<string>(type: "TEXT", nullable: true),
                    Boja = table.Column<string>(type: "TEXT", nullable: true),
                    Tip_Oglasa = table.Column<string>(type: "TEXT", nullable: true),
                    Starost = table.Column<string>(type: "TEXT", nullable: true),
                    Vakcinisan = table.Column<bool>(type: "INTEGER", nullable: false),
                    Sterilisan = table.Column<bool>(type: "INTEGER", nullable: false),
                    Papiri = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Oglasi", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Oglasi");
        }
    }
}

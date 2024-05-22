using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class KorisnikId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Oglasi_AspNetUsers_KorisnikId",
                table: "Oglasi");

            migrationBuilder.AddForeignKey(
                name: "FK_Oglasi_AspNetUsers_KorisnikId",
                table: "Oglasi",
                column: "KorisnikId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Oglasi_AspNetUsers_KorisnikId",
                table: "Oglasi");

            migrationBuilder.AddForeignKey(
                name: "FK_Oglasi_AspNetUsers_KorisnikId",
                table: "Oglasi",
                column: "KorisnikId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Porukav2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Poruke_AspNetUsers_KorisnikId",
                table: "Poruke");

            migrationBuilder.DropIndex(
                name: "IX_Poruke_KorisnikId",
                table: "Poruke");

            migrationBuilder.DropColumn(
                name: "KorisnikId",
                table: "Poruke");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "KorisnikId",
                table: "Poruke",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Poruke_KorisnikId",
                table: "Poruke",
                column: "KorisnikId");

            migrationBuilder.AddForeignKey(
                name: "FK_Poruke_AspNetUsers_KorisnikId",
                table: "Poruke",
                column: "KorisnikId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class KorisnikOglas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Slike_Oglasi_OglasId",
                table: "Slike");

            migrationBuilder.AddColumn<string>(
                name: "KorisnikId",
                table: "Oglasi",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Oglasi_KorisnikId",
                table: "Oglasi",
                column: "KorisnikId");

            migrationBuilder.AddForeignKey(
                name: "FK_Oglasi_AspNetUsers_KorisnikId",
                table: "Oglasi",
                column: "KorisnikId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Slike_Oglasi_OglasId",
                table: "Slike",
                column: "OglasId",
                principalTable: "Oglasi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Oglasi_AspNetUsers_KorisnikId",
                table: "Oglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_Slike_Oglasi_OglasId",
                table: "Slike");

            migrationBuilder.DropIndex(
                name: "IX_Oglasi_KorisnikId",
                table: "Oglasi");

            migrationBuilder.DropColumn(
                name: "KorisnikId",
                table: "Oglasi");

            migrationBuilder.AddForeignKey(
                name: "FK_Slike_Oglasi_OglasId",
                table: "Slike",
                column: "OglasId",
                principalTable: "Oglasi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Poruka : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Sadrzaj",
                table: "Poruke",
                newName: "Text");

            migrationBuilder.CreateTable(
                name: "Chats",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    PorukaId = table.Column<string>(type: "TEXT", nullable: true),
                    PosiljalacId = table.Column<string>(type: "TEXT", nullable: true),
                    PrimalacId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Chats_AspNetUsers_PosiljalacId",
                        column: x => x.PosiljalacId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Chats_AspNetUsers_PrimalacId",
                        column: x => x.PrimalacId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Chats_Poruke_PorukaId",
                        column: x => x.PorukaId,
                        principalTable: "Poruke",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Chats_PorukaId",
                table: "Chats",
                column: "PorukaId");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_PosiljalacId",
                table: "Chats",
                column: "PosiljalacId");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_PrimalacId",
                table: "Chats",
                column: "PrimalacId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Chats");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Poruke",
                newName: "Sadrzaj");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Slikav2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Putanja",
                table: "Slike",
                newName: "Url");

            migrationBuilder.AddColumn<Guid>(
                name: "OglasId",
                table: "Slike",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Profilna",
                table: "Slike",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Slike_OglasId",
                table: "Slike",
                column: "OglasId");

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
                name: "FK_Slike_Oglasi_OglasId",
                table: "Slike");

            migrationBuilder.DropIndex(
                name: "IX_Slike_OglasId",
                table: "Slike");

            migrationBuilder.DropColumn(
                name: "OglasId",
                table: "Slike");

            migrationBuilder.DropColumn(
                name: "Profilna",
                table: "Slike");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Slike",
                newName: "Putanja");
        }
    }
}

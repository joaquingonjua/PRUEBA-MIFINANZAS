using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    public partial class v12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "P2Name",
                table: "Partidas",
                newName: "p2Name");

            migrationBuilder.RenameColumn(
                name: "P1Name",
                table: "Partidas",
                newName: "p1Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "p2Name",
                table: "Partidas",
                newName: "P2Name");

            migrationBuilder.RenameColumn(
                name: "p1Name",
                table: "Partidas",
                newName: "P1Name");
        }
    }
}

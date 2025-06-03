using Microsoft.EntityFrameworkCore.Migrations;

namespace WebBanHang.Migrations
{
    public partial class InitWithSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Insert dữ liệu cho bảng Categories
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name", "DisplayOrder" },
                values: new object[,]
                {
                    { 1, "Điện thoại", 1 },
                    { 2, "Máy tính bảng", 2 },
                    { 3, "Laptop", 3 }
                });

            // Insert dữ liệu cho bảng Products
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 1, 1, null, null, "Iphone 7", 300.0 },
                    { 2, 1, null, null, "Iphone 7s", 350.0 },
                    { 3, 1, null, null, "Iphone 8", 400.0 },
                    { 4, 1, null, null, "Iphone 8s", 420.0 },
                    { 5, 1, null, null, "Iphone 12", 630.0 },
                    { 6, 1, null, null, "Iphone 12 Pro", 750.0 },
                    { 7, 1, null, null, "Iphone 14", 820.0 },
                    { 8, 1, null, null, "Iphone 14 Pro", 950.0 },
                    { 9, 1, null, null, "Iphone 15", 1200.0 },
                    { 10, 1, null, null, "Iphone 15 Pro Max", 1450.0 },
                    { 11, 2, null, null, "Ipad Gen 10", 750.0 },
                    { 12, 2, null, null, "Ipad Pro 11", 1250.0 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Xoá dữ liệu khỏi bảng Products
            for (int id = 1; id <= 12; id++)
            {
                migrationBuilder.DeleteData(
                    table: "Products",
                    keyColumn: "Id",
                    keyValue: id);
            }

            // Xoá dữ liệu khỏi bảng Categories
            for (int id = 1; id <= 3; id++)
            {
                migrationBuilder.DeleteData(
                    table: "Categories",
                    keyColumn: "Id",
                    keyValue: id);
            }
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebBanHang.Models;
using WebBanHang.Areas.Customer.Models;

namespace WebBanHang.Areas.Customer.Controllers
{
    [Area("Customer")] // Đánh dấu controller này thuộc khu vực khách hàng
    public class ProductController : Controller
    {
        private ApplicationDbContext _db; // Biến dùng để truy xuất cơ sở dữ liệu

        // Constructor nhận đối tượng DbContext thông qua Dependency Injection
        public ProductController(ApplicationDbContext db)
        {
            _db = db;
        }

        // Hiển thị danh sách sản phẩm theo danh mục (mặc định catid = 1)
        public IActionResult Index(int catid = 1)
        {
            // Truy xuất danh sách sản phẩm có CategoryId = catid và kèm theo thông tin danh mục
            var dsSanPham = _db.Products
                               .Include(x => x.Category) // Truy vấn nối với bảng Category
                               .Where(x => x.CategoryId == catid) // Lọc theo danh mục
                               .ToList();

            // Trả về view kèm danh sách sản phẩm theo danh mục
            return View(dsSanPham);
        }

        // Trả về danh sách danh mục + số lượng sản phẩm tương ứng, dùng cho sidebar hoặc menu
        public IActionResult GetCategory()
        {
            // Lấy danh sách danh mục và đếm số sản phẩm trong từng danh mục
            var dsTheLoai = _db.Categories
                .Select(c => new CategoryWithCountVM
                {
                    Id = c.Id, // ID danh mục
                    Name = c.Name, // Tên danh mục
                    ProductCount = _db.Products.Count(p => p.CategoryId == c.Id) // Số lượng sản phẩm thuộc danh mục này
                })
                .ToList();

            // Trả về PartialView tên "CategoryPartial" chứa danh sách danh mục kèm số lượng
            return PartialView("CategoryPartial", dsTheLoai);
        }
    }
}
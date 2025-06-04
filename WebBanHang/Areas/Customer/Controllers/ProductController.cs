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
            var dsSanPham = _db.Products
                               .Include(x => x.Category)
                               .Where(x => x.CategoryId == catid)
                               .ToList();

            return View(dsSanPham);
        }

        // Trả về danh sách danh mục + số lượng sản phẩm tương ứng
        public IActionResult GetCategory()
        {
            var dsTheLoai = _db.Categories
                .Select(c => new CategoryWithCountVM
                {
                    Id = c.Id,
                    Name = c.Name,
                    ProductCount = _db.Products.Count(p => p.CategoryId == c.Id)
                })
                .ToList();

            return PartialView("CategoryPartial", dsTheLoai);
        }

        // PartialView sản phẩm theo danh mục (cho Ajax)
        public IActionResult GetProductsByCategory(int catid)
        {
            var dsSanPham = _db.Products
                               .Include(x => x.Category)
                               .Where(x => x.CategoryId == catid)
                               .ToList();

            return PartialView("_ProductPartial", dsSanPham);
        }
    }
}

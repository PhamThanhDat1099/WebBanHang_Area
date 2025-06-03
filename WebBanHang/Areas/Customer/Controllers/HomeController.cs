using Microsoft.AspNetCore.Mvc; // Dùng cho controller, action, view
using Microsoft.Extensions.Logging; 
using System.Collections.Generic; // Cho các kiểu danh sách
using System.Diagnostics; // Dùng để theo dõi hiệu năng (không dùng ở đây)
using System.Linq; // Dùng cho các truy vấn LINQ như Skip, Take, ToList
using Microsoft.EntityFrameworkCore; // Cho phép Include() để truy xuất bảng liên kết
using WebBanHang.Models; // Sử dụng các lớp model và DbContext

namespace WebBanHang.Areas.Customer.Controllers
{
    [Area("Customer")] // Đánh dấu controller này thuộc khu vực "Customer"
    public class HomeController : Controller
    {
        private ApplicationDbContext _db; // Biến dùng để truy cập cơ sở dữ liệu

        // Constructor nhận đối tượng DbContext thông qua Dependency Injection
        public HomeController(ApplicationDbContext db)
        {
            _db = db;
        }

        // Action mặc định khi truy cập trang chủ (Hiển thị danh sách sản phẩm phân trang)
        public IActionResult Index()
        {
            var pageSize = 4; // Số sản phẩm hiển thị trên trang đầu tiên
            var dsSanPham = _db.Products.Include(x => x.Category).ToList(); // Lấy danh sách sản phẩm kèm thông tin danh mục

            // Trả về view kèm theo 4 sản phẩm đầu tiên
            return View(dsSanPham.Skip(0).Take(pageSize).ToList());
        }

        // Action dùng để load thêm sản phẩm (dùng với Ajax Load More)
        public IActionResult LoadMore(int page = 1)
        {
            var pageSize = 4; // Số sản phẩm mỗi lần load thêm
            var dsSanPham = _db.Products.Include(x => x.Category).ToList(); // Lấy toàn bộ danh sách sản phẩm

            // Tính toán số sản phẩm cần hiển thị theo trang và trả về PartialView
            return PartialView("_ProductPartial", dsSanPham.Skip((page - 1) * pageSize).Take(pageSize).ToList());
        }

        // Trang thông tin riêng tư (thường mặc định hoặc hiển thị chính sách bảo mật)
        public IActionResult Privacy()
        {
            return View();
        }
    }
}

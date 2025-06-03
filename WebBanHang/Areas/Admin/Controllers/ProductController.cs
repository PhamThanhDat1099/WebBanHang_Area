// Khai báo các namespace cần thiết
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models; // Sử dụng mô hình dữ liệu
using Microsoft.AspNetCore.Hosting; // Dùng để xử lý tệp và thư mục trong web
using Microsoft.AspNetCore.Mvc.Rendering; // Tạo SelectList trong ViewBag
using System.IO; // Xử lý file
using Microsoft.AspNetCore.Mvc; // Cung cấp base controller
using Microsoft.EntityFrameworkCore; // Sử dụng Include và các truy vấn nâng cao
using Microsoft.AspNetCore.Http; // Để upload file từ form
using Microsoft.AspNetCore.Authorization; // Xác thực vai trò người dùng

namespace WebBanHang.Areas.Admin.Controllers
{
    [Area("Admin")] // Đánh dấu controller này thuộc Area Admin
    [Authorize(Roles = SD.Role_Admin)] // Chỉ Admin mới được truy cập controller này
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _db; // DB context để truy xuất dữ liệu
        private readonly IWebHostEnvironment _hosting; // Dùng để lấy đường dẫn thư mục wwwroot

        public ProductController(ApplicationDbContext db, IWebHostEnvironment hosting)
        {
            _db = db;
            _hosting = hosting;
        }

        // Giao diện danh sách sản phẩm có phân trang
        public IActionResult Index(int page = 1)
        {
            int pageSize = 3; // Số sản phẩm mỗi trang
            var productList = _db.Products.Include(x => x.Category).ToList();
            var pagedProducts = productList.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            // Gửi số trang và trang hiện tại về view để phân trang
            ViewBag.PageSum = Math.Ceiling((double)productList.Count / pageSize);
            ViewBag.CurrentPage = page;

            // Nếu là request từ Ajax (jQuery), chỉ trả về PartialView
            if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
            {
                return PartialView("_ProductListPartial", pagedProducts);
            }

            return View(pagedProducts);
        }

        // Hiển thị giao diện thêm mới sản phẩm
        public IActionResult Add()
        {
            // Truy xuất danh sách danh mục để gán vào ViewBag -> dùng trong dropdown
            ViewBag.CategoryList = _db.Categories.Select(x => new SelectListItem
            {
                Value = x.Id.ToString(),
                Text = x.Name
            });
            return View();
        }

        // Xử lý thêm mới sản phẩm khi submit
        [HttpPost]
        public IActionResult Add(Product product, IFormFile ImageUrl)
        {
            if (ModelState.IsValid)
            {
                if (ImageUrl != null)
                {
                    product.ImageUrl = SaveImage(ImageUrl); // Lưu hình ảnh
                }

                _db.Products.Add(product); // Thêm vào DB
                _db.SaveChanges(); // Lưu thay đổi
                TempData["success"] = "Product inserted success"; // Thông báo thành công
                return RedirectToAction("Index");
            }

            // Nếu Model không hợp lệ, hiển thị lại form với danh sách danh mục
            ViewBag.CategoryList = _db.Categories.Select(x => new SelectListItem
            {
                Value = x.Id.ToString(),
                Text = x.Name
            });
            return View();
        }

        // Hiển thị form cập nhật sản phẩm
        public IActionResult Update(int id)
        {
            var product = _db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            ViewBag.CategoryList = _db.Categories.Select(x => new SelectListItem
            {
                Value = x.Id.ToString(),
                Text = x.Name
            });
            return View(product);
        }

        // Xử lý cập nhật sản phẩm sau khi submit
        [HttpPost]
        public IActionResult Update(Product product, IFormFile ImageUrl)
        {
            if (ModelState.IsValid)
            {
                var existingProduct = _db.Products.Find(product.Id);

                if (ImageUrl != null)
                {
                    product.ImageUrl = SaveImage(ImageUrl);

                    // Xoá hình cũ nếu có
                    if (!string.IsNullOrEmpty(existingProduct.ImageUrl))
                    {
                        var oldFilePath = Path.Combine(_hosting.WebRootPath, existingProduct.ImageUrl);
                        if (System.IO.File.Exists(oldFilePath))
                        {
                            System.IO.File.Delete(oldFilePath);
                        }
                    }
                }
                else
                {
                    product.ImageUrl = existingProduct.ImageUrl; // Giữ nguyên hình cũ nếu không chọn hình mới
                }

                // Cập nhật dữ liệu sản phẩm
                existingProduct.Name = product.Name;
                existingProduct.Description = product.Description;
                existingProduct.Price = product.Price;
                existingProduct.CategoryId = product.CategoryId;
                existingProduct.ImageUrl = product.ImageUrl;

                _db.SaveChanges();
                TempData["success"] = "Product updated success";
                return RedirectToAction("Index");
            }

            ViewBag.CategoryList = _db.Categories.Select(x => new SelectListItem
            {
                Value = x.Id.ToString(),
                Text = x.Name
            });
            return View();
        }

        // Hàm lưu hình ảnh sản phẩm
        private string SaveImage(IFormFile image)
        {
            var filename = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName); // Tạo tên ngẫu nhiên
            var path = Path.Combine(_hosting.WebRootPath, @"images/products"); // Thư mục lưu trữ
            var saveFile = Path.Combine(path, filename); // Đường dẫn đầy đủ

            // Lưu file vào thư mục
            using (var filestream = new FileStream(saveFile, FileMode.Create))
            {
                image.CopyTo(filestream);
            }

            return @"images/products/" + filename;
        }

        // Giao diện xác nhận xoá sản phẩm
        public IActionResult Delete(int id)
        {
            var product = _db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return View(product);
        }

        // Xử lý xoá sản phẩm thật sự
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            var product = _db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            // Xoá hình ảnh trên máy chủ nếu có
            if (!String.IsNullOrEmpty(product.ImageUrl))
            {
                var oldFilePath = Path.Combine(_hosting.WebRootPath, product.ImageUrl);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
            }

            _db.Products.Remove(product); // Xoá khỏi DB
            _db.SaveChanges();
            TempData["success"] = "Product deleted success"; // Thông báo thành công

            return RedirectToAction("Index");
        }
    }
}

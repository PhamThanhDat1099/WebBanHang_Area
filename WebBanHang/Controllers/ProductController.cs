using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebBanHang.Models;



namespace WebBanHang.Controllers
{
    public class ProductController : Controller
    {
        private ApplicationDbContext _db;
        public ProductController(ApplicationDbContext db)

        {
            _db = db;
        }
        public IActionResult Index(int catid = 1)

        {
            var dsSanPham = _db.Products.Include(x => x.Category).Where(x => x.CategoryId == catid).ToList();
            return View(dsSanPham);
        }
        public IActionResult GetCategory()
        {
            var dsTheLoai = _db.Categories.ToList();
            return PartialView("CategoryPartial", dsTheLoai);
        }

    }
}
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Areas.Customer.Models;
using WebBanHang.Models;

namespace WebBanHang.Areas.Customer.Controllers
{
    [Area("Customer")]
    public class CartController : Controller
    {
        private readonly ApplicationDbContext _db;
        public CartController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            Cart cart = HttpContext.Session.GetJson<Cart>("CART");
            if (cart == null)
            {
                cart = new Cart();
            }
            return View(cart);
        }

        public IActionResult AddToCart(int productId)
        {
            var product = _db.Products.FirstOrDefault(x => x.Id == productId);
            if (product != null)
            {
                Cart cart = HttpContext.Session.GetJson<Cart>("CART") ?? new Cart();
                cart.Add(product, 1);
                HttpContext.Session.SetJson("CART", cart);
                TempData["success"] = "Đã thêm sản phẩm vào giỏ hàng!";
                return RedirectToAction("Index");
            }
            TempData["error"] = "Không tìm thấy sản phẩm để thêm vào giỏ.";
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult Update(int productId, int qty)
        {
            var product = _db.Products.FirstOrDefault(x => x.Id == productId);
            if (product != null)
            {
                Cart cart = HttpContext.Session.GetJson<Cart>("CART");
                if (cart != null)
                {
                    cart.Update(productId, qty);
                    HttpContext.Session.SetJson("CART", cart);
                    TempData["success"] = "Cập nhật số lượng thành công!";
                    return RedirectToAction("Index");
                }
            }
            TempData["error"] = "Không thể cập nhật số lượng sản phẩm!";
            return RedirectToAction("Index");
        }

        public IActionResult Remove(int productId)
        {
            var product = _db.Products.FirstOrDefault(x => x.Id == productId);
            if (product != null)
            {
                Cart cart = HttpContext.Session.GetJson<Cart>("CART");
                if (cart != null)
                {
                    cart.Remove(productId);
                    HttpContext.Session.SetJson("CART", cart);
                    TempData["success"] = "Đã xóa sản phẩm khỏi giỏ hàng!";
                    return RedirectToAction("Index");
                }
            }
            TempData["error"] = "Không thể xóa sản phẩm khỏi giỏ hàng!";
            return RedirectToAction("Index");
        }

        public IActionResult AddToCartAPI(int productId)
        {
            var product = _db.Products.FirstOrDefault(x => x.Id == productId);
            if (product != null)
            {
                Cart cart = HttpContext.Session.GetJson<Cart>("CART") ?? new Cart();
                cart.Add(product, 1);
                HttpContext.Session.SetJson("CART", cart);
                return Json(new { msg = "Product added to cart", qty = cart.Quantity });
            }
            return Json(new { msg = "error" });
        }

        public IActionResult GetQuantityOfCart()
        {
            Cart cart = HttpContext.Session.GetJson<Cart>("CART");
            if (cart != null)
            {
                return Json(new { qty = cart.Quantity });
            }
            return Json(new { qty = 0 });
        }
    }
}

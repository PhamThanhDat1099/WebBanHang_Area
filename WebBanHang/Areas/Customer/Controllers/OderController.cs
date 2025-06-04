using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using WebBanHang.Areas.Customer.Models;
using WebBanHang.Models;

namespace WebBanHang.Areas.Customer.Controllers
{
    [Area("Customer")]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _db;
        public OrderController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            var cart = HttpContext.Session.GetJson<Cart>("CART");
            if (cart == null || !cart.Items.Any())
            {
                return RedirectToAction("Index", "Cart");
            }

            ViewBag.CART = cart;
            return View();
        }

        [HttpPost]
        public IActionResult ProcessOrder(Order order)
        {
            var cart = HttpContext.Session.GetJson<Cart>("CART");

            if (cart == null || !cart.Items.Any())
            {
                return RedirectToAction("Index", "Cart");
            }

            // Nếu dữ liệu không hợp lệ thì im lặng quay lại trang giỏ
            if (!ModelState.IsValid)
            {
                return RedirectToAction("Index", "Cart");
            }

            try
            {
                // Tạo mới đơn hàng
                order.OrderDate = DateTime.Now;
                order.Total = cart.Total;
                order.State = "Pending";

                _db.Orders.Add(order);
                _db.SaveChanges();

                var orderDetails = cart.Items.Select(item => new OrderDetail
                {
                    OrderId = order.Id,
                    ProductId = item.Product.Id,
                    Quantity = item.Quantity
                }).ToList();

                _db.OrderDetails.AddRange(orderDetails);
                _db.SaveChanges();

                // Xóa giỏ hàng
                HttpContext.Session.Remove("CART");

                // Chỉ báo thành công
                TempData["success"] = "Đơn hàng đã được đặt thành công!";
                return View("Result");
            }
            catch
            {
                // Không làm gì khi có lỗi → quay lại giỏ hàng
                return RedirectToAction("Index", "Cart");
            }
        }
    }
}

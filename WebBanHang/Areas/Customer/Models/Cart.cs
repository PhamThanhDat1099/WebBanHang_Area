using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBanHang.Models;

namespace WebBanHang.Areas.Customer.Models
{
    //lớp biểu diễn giỏ hàng
    public class Cart
    {
        private List<CartItem> _items;
        public Cart()
        {
            _items = new List<CartItem>();
        }
        public List<CartItem> Items { get { return _items; } }
        //--------cac phuong thuc xu ly tren Giỏ hàng-----------
        //phuong thuc them 1 san pham vào giỏ
        public void Add(Product p, int qty)
        {
            var item = _items.FirstOrDefault(x => x.Product.Id == p.Id);
            if (item == null) //chưa có
            {
                _items.Add(item: new CartItem { Product = p, Quantity = qty });
            }
            else
            {
                item.Quantity += qty;
            }
        }
        //phuong thuc cập nhật số lượng
        public void Update(int productId, int qty)
        {
            var item = _items.FirstOrDefault(x => x.Product.Id == productId);
            if (item != null)//tồn tại
            {
                if (qty > 0)
                {
                    item.Quantity = qty;
                }
                else
                {
                    _items.Remove(item);
                }
            }
        }
        //phuong thuc cập nhật số lượng
        public void Remove(int productId)
        {
            var item = _items.FirstOrDefault(x => x.Product.Id == productId);
            if (item != null)
            {
                _items.Remove(item);
            }
        }
        //tính tổng thành tiền
        public double Total
        {
            get
            {
                double total = _items.Sum(x => x.Quantity * x.Product.Price);

                return total;
            }
        }
        //tính tổng số lượng sản phẩm
        public double Quantity
        {
            get
            {
                double total = _items.Sum(x => x.Quantity);
                return total;
            }
        }
    }
}

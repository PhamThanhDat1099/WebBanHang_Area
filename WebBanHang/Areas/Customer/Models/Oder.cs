using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebBanHang.Areas.Customer.Models
{
    public class Order
    {
        public int Id { get; set; }

        public DateTime OrderDate { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập họ tên đầy đủ")]
        public string CustomerName { get; set; }

        [Required(ErrorMessage = "Vui lòng cung cấp địa chỉ giao hàng")]
        public string Address { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập số điện thoại liên hệ")]
        public string Phone { get; set; }

        public double Total { get; set; }

        public string State { get; set; }

        //Navigation property để EF hiểu quan hệ 1-n với OrderDetail
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}

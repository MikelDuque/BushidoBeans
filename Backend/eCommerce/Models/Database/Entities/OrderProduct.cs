using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[PrimaryKey(nameof(OrderId), nameof(ProductId))]
public class OrderProduct
{
   public int Quantity { get; set; }
   public decimal PurchasePrice { get; set; }

  
   /* RELACIONES 1-M */
   [ForeignKey(nameof(Order))]
   public long OrderId { get; set; }
   public Order Order { get; set; }

   [ForeignKey(nameof(Product))]
   public required long ProductId { get; set; }
   public Product Product { get; set; }
}
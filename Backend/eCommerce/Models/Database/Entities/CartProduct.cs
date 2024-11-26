using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[PrimaryKey(nameof(ProductId), nameof(UserId))]
public class CartProduct
{
   public int Quantity { get; set; }

   
   [ForeignKey(nameof(User))]
   public required long UserId { get; set; }
   public User User { get; set; }

   /*
   [ForeignKey(nameof(Cart))]
   public required long CartId { get; set; }
   public Cart Cart { get; set; }
   */

   [ForeignKey(nameof(Product))]
   public required long ProductId { get; set; }
   public Product Product { get; set; }

   public List<Order> Orders { get; set; } = null!;
}
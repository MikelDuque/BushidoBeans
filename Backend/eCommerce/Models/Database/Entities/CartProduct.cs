using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[PrimaryKey(nameof(UserId), nameof(ProductId))]
public class CartProduct
{
   public int Quantity { get; set; }

   
   [ForeignKey(nameof(User))]
   public required long UserId { get; set; }
   public User User { get; set; }

   [ForeignKey(nameof(Product))]
   public required long ProductId { get; set; }
   public Product Product { get; set; }
}
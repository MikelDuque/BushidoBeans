using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[PrimaryKey(nameof(ProductId), nameof(CartId))]
public class CartProduct
{
   [ForeignKey(nameof(Cart))]
   public required long CartId { get; set; }
   public Cart Cart { get; set; }

   [ForeignKey(nameof(Product))]
   public required long ProductId { get; set; }
   public Product Product { get; set; }
   
   public int Quantity { get; set; }

   public int Stock { get; set; }
}
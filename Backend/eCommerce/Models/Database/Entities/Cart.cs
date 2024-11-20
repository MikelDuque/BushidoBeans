using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.Models.Database.Entities;

public class Cart
{
   public long Id { get; set; }
   [ForeignKey(nameof(Id))]
   public User User { get; set; } = null!;

   public List<Product> Products { get; } = [];
   public List<CartProduct> CartProducts { get; } = [];
}
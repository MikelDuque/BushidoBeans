using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.Models.Database.Entities;

public class Cart
{
   [ForeignKey(nameof(User))]
   public long Id { get; set; }
   public User User { get; set; }

  //Relaciones
   public List<Product> Products { get; set; } = [];
   public List<CartProduct> CartProducts { get; set; } = [];
}
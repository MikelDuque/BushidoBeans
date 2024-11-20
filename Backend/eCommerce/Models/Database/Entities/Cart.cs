using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.Models.Database.Entities;

public class Cart
{
    public long Id { get; set; }
    public long UserId { get; set; }
    [ForeignKey(nameof(UserId))]
    public User User { get; set; } = null!;
    //Relaciones
    public List<CartProduct> CartProducts { get; set; } = new();
}
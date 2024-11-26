using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[Index(nameof(Mail), IsUnique = true)]
public class User
{
    public long Id { get; set; }
    public required string Mail { get; set; }
    public required string Password { get; set; }
    public required string Name { get; set; }
    public string Surname { get; set; }
    public int Phone { get; set; }
    public required string Role { get; set; }

    //public Cart Cart { get; set; }
    public ICollection<Review> Reviews { get; } = [];
    public List<Product> Products { get; } = [];
    public List<CartProduct> CartProducts { get; } = [];
    public List<Order> Orders { get; } = [];
}
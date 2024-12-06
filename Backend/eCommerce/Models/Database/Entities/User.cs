using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[Index(nameof(Mail), IsUnique = true)]
public class User
{
    public long Id { get; set; }
    public required string Mail { get; set; }
    public string Password { get; set; }
    public required string Name { get; set; }
    public string Surname { get; set; }
    public int Phone { get; set; }
    public required string Role { get; set; }

    /* RELACIONES 1-M */
    public ICollection<Review> Reviews { get; } = [];
    public ICollection<Order> Orders { get; set; } = [];
    public ICollection<Address> Addresses { get; set; } = [];

    /* RELACIONES M-N */
    public List<Product> Products { get; } = [];
    public List<CartProduct> CartProducts { get; set; } = [];
}
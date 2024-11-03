using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[Index(nameof(Mail), IsUnique = true)]
public class User
{
    public long Id { get; set; }
    public required string Mail { get; set; }
    public string Password { get; set; } = null!;
    public required string Name { get; set; }
    public string? Surname { get; set; }
    public int Phone { get; set; }
    public required string? Role { get; set; }

    public ICollection<Review> Reviews { get; } = new List<Review>();
    public Cart? Cart { get; set; }
}
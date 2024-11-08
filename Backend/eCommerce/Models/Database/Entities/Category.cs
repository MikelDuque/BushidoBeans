namespace eCommerce.Models.Database.Entities;

public class Category
{
    public long Id { get; set; }
    public required string Name { get; set; }

    public ICollection<Product> Products { get; } = new List<Product>();
}
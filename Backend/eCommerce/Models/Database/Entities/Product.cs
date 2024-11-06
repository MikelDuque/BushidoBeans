using eCommerce.Models.Enums;

namespace eCommerce.Models.Database.Entities;

public class Product
{
    public long Id { get; set; }
    public string Image { get; set; }
    public required string Name { get; set; }
    public string Description { get; set; }
    public string NutritionalInfo { get; set; }
    public EIntensity Intensity { get; set; }
    public required decimal Price { get; set; }
    public float Discount { get; set; }
    public int Stock { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public ICollection<Review> Reviews { get; } = new List<Review>();
}
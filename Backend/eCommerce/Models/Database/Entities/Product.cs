using eCommerce.Models.Enums;

namespace eCommerce.Models.Database.Entities;

public class Product
{
    public long Id { get; set; }
    public string Image { get; set; }
    public required string Name { get; set; }
    public string Description { get; set; }
    public string NutritionalInfo { get; set; }
    public ECategory Category { get; set; }
    public EIntensity Intensity { get; set; }
    public required decimal Price { get; set; }
    public float Discount { get; set; }
    public int Stock { get; set; }
    public float Score { get; set; }
}
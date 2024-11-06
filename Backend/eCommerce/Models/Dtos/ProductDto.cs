using eCommerce.Models.Enums;

namespace eCommerce.Models.Dtos;

public class ProductDto
{
    public long Id { get; set; }
    public string Image { get; set; }
    public required string Name { get; set; }
    public string Description { get; set; }
    public ECategory Category { get; set; }
    public EIntensity Intensity { get; set; }
    public decimal Price { get; set; }
    public required int Stock { get; set; }
    public double Score { get; set; }
    public int TotalReviews {get; set; }
}
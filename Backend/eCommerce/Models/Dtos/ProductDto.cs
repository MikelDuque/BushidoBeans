using System.Text.Json.Serialization;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Dtos;

public class ProductDto
{
    public long Id { get; set; }
    public string Image { get; set; }
    public required string Name { get; set; }
    public string Description { get; set; }
    public long Category { get; set; }
    public int Intensity { get; set; }
    public decimal Price { get; set; }
    public required int Stock { get; set; }
    public double Score { get; set; }
    public int TotalReviews {get; set; }
    public ICollection<ReviewDto> Reviews { get; set; }
}
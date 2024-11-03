namespace eCommerce.Models.Dtos;

public class ProductDto
{
    public long Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public string? NutritionalInfo { get; set; }
    public byte Intensity { get; set; } //puede ser byte, int o enum, preguntar a Mik
    public decimal Price { get; set; }
    public float Discount { get; set; }
    public required int Stock { get; set; }
    public byte Score { get; set; }
    
    public List<ReviewDto>? Reviews { get; set; }
}

/*
 EJEMPLO DE ENUM
 
 public enum IntensityLevel
{
    Low = 0,
    MediumLow = 1,
    Medium = 2,
    MediumHigh = 3,
    High = 4,
    VeryHigh = 5
}

public class ProductDTO
{
    public blablablabla....
    public IntensityLevel Intensity { get; set; }
}
 
 */
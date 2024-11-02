using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[PrimaryKey(nameof(ID))]
public class Product
{
    public long ID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string NutritionalInfo { get; set; }
    public byte Intensity { get; set; } //puede ser byte, int o enum, preguntar a Mik
    public decimal Price { get; set; }
    public int Discount { get; set; }
    public int Quantity { get; set; }
    public decimal Score { get; set; }

    public ICollection<Review> Reviews { get; set; } //Colección de Reviews, Mik, para que un producto pueda almacenar muchas Reviews distintas.
    public ICollection<Cart> Carts { get; set; }
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
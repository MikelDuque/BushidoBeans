using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace eCommerce.Models.Database.Entities;

public class Product
{
    public long Id { get; set; }
    public string Image { get; set; }   //URL de la imagen en el frontend
    public required string Name { get; set; }
    public string Description { get; set; }
    public string NutritionalInfo { get; set; }
    public string Category { get; set; }
    public byte Intensity { get; set; } //puede ser byte, int o enum, preguntar a Mik
    public required decimal Price { get; set; }
    public float Discount { get; set; }
    public int Stock { get; set; }
    public float Score { get; set; }

    public ICollection<Review> Reviews { get; } = new List<Review>();
    public List<Cart> Carts { get; } = [];
    public List<CartProduct> CartProducts { get; } = [];
}
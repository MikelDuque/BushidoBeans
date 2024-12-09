using System.ComponentModel.DataAnnotations.Schema;
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


    /* RELACIONES 1-M */
    [ForeignKey(nameof(Category))]
    public required long CategoryId { get; set; }
    public Category Category { get; set; }

    /* RELACIONES M-N */
    public ICollection<Review> Reviews { get; } = []; 
    public List<User> Users { get; } = [];
    public List<CartProduct> CartProducts { get; } = [];
    public List<Order> Orders { get; } = [];
    public List<OrderProduct> OrderProducts { get; } = [];
}
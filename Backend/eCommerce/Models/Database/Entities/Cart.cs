using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[Owned]
public class Cart
{
    public List<Product> Products { get; } = [];
    public List<ProductCart> ProductCarts { get; } = [];
}
using System;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[PrimaryKey(nameof(ProductId), nameof(CartId))]
public class CartProduct
{
    public long CartId { get; set; }
    public long ProductId { get; set; }
    public required int Quantity {  get; set; } 
}
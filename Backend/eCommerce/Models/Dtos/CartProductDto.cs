using System;

namespace eCommerce.Models.Dtos;

public class CartProductDto
{
 public long CartId { get; set; }
 public long ProductId { get; set; }
 public string Image { get; set; }
 public string Name { get; set; }
 public decimal Price { get; set; }
 public required int Quantity {  get; set; } 
 public int Stock { get; set; }
}

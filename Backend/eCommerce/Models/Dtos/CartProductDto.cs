using System;

namespace eCommerce.Models.Dtos;

public class CartProductDto
{
 public long ProductId { get; set; }
 public string Image { get; set; }
 public string Name { get; set; }
 public decimal Price { get; set; }
 public int Stock { get; set; }
 public required int Quantity {  get; set; }
}

using System;

namespace eCommerce.Models.Dtos;

public class CartDto
{
  public long Id { get; set; }
  public Dictionary<long, byte> Products { get; set; } = [];
}

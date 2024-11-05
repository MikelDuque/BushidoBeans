using System;

namespace eCommerce.Models.Dtos;

public class UserDto
{
  public required long Id {get; set;}
  public required string Mail {get; set;}
  public required string Name {get; set;}
  public string? Surname {get; set;}
  public int Phone {get; set;}
  public required string? Role {get;set;}

  public List<ReviewDto>? Reviews { get; set; }
  public List<CartDto>? Carts { get; set; }
}

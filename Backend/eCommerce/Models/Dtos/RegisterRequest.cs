using System;

namespace eCommerce.Models.Dtos;

public class RegisterRequest
{
  public required string Mail {get; set;}
  public required string Name {get; set;}
  public string Surname {get; set;}
  public required string Password {get; set;}
  public required string Address { get; set;}
  public required int Phone {get; set;}
}

using System;

namespace eCommerce.Models.Dtos;

public class RegisterRequest
{
  public required string Mail {get; set;}
  public required string Name {get; set;}
  public required string Password {get; set;}
}

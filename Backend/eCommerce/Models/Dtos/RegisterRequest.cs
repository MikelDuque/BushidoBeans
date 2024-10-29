using System;

namespace eCommerce.Models.Dtos;

public class RegisterRequest
{
  public string Mail {get; set;}
  public string Name {get; set;}
  public string Password {get; set;}
}

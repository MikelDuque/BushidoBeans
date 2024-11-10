using System;

namespace eCommerce.Models.Dtos;

public class LoginRequest
{
  public required string Mail {get;set;}
  public required string Password {get;set;}
}

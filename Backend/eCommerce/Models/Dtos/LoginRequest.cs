using System;

namespace eCommerce.Models.Dtos;

public class LoginRequest
{
  public string Mail {get;set;}
  public string Password {get;set;}
  public string Admin {get;set;}
}

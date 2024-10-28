using System;

namespace eCommerce.Models.Dtos;

public class UserDto
{
  public long ID {get; set;}
  public string Mail {get; set;}
  public string Name {get; set;}
  public string Surname {get; set;}
  public int Phone {get; set;}
  public string Admin {get;set;}
}

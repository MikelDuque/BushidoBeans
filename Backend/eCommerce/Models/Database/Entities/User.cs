using System;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[PrimaryKey(nameof(ID))]
public class User
{
  public long ID {get; set;}
  public string Mail {get; set;}
  public string Password {get; set;}
  public string Name {get; set;}
  public string Apellidos {get; set;}
  public int Phone {get; set;}
  public bool Admin {get;set;}
}

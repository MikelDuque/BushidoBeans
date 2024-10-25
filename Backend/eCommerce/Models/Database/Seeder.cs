using System;
using eCommerce.Models.Database.Entities;

namespace eCommerce.Models.Database;

public class Seeder
{
  private readonly DataContext _dbContext;

  public Seeder(DataContext context) {
    _dbContext = context;
  }

  public async Task SeedAsync() {
    await Seed();
    await _dbContext.SaveChangesAsync();
  }

  private async Task Seed() {
    User[] users = 
    [
      new User
      {
        Mail = "imongut0701@g.educaand.es",
        Name = "Ivan",
        Password = "Hola#123456789",
        Apellidos = "Montes Gutierrez",
        Phone = 683956402,
        Admin = true
      }
    ];

    //Añadimos el rango de usuarios a la BDD
    await _dbContext.Users.AddRangeAsync(users);
  }

  
}

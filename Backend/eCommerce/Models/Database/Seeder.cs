using eCommerce.Models.Database.Entities;
using eCommerce.Services;

namespace eCommerce.Models.Database;

public class Seeder
{
    private readonly DataContext _dbContext;

    public Seeder(DataContext context)
    {
        _dbContext = context;
    }

    public async Task SeedAsync()
    {
        await Seed();
        await _dbContext.SaveChangesAsync();
    }

    private async Task Seed()
    {
        User[] users =
        [
          new User
      {
        Mail = "imongut0701@g.educaand.es",
        Name = "Ivan",
        Password = AuthService.HashPassword("Hola#123456789") ,
        Surname = "Montes Gutierrez",
        Phone = 683956402,
        Role = "admin"
      }
        ];

        Product[] products =
        [
          new Product
      {
        Name = "La especialidad de Fígaro",
        Description = "El mejor café de \"El Alpiste\" traído hasta aquí.",
        NutritionalInfo = null,
        Category = 0,
        Intensity = Enum.EIntensity.1,
        Price = 2.50M,
        Discount = 0,
        Stock = 5,
        Score = 1
      }
        ];

        //Añadimos el rango de usuarios a la BDD
        await _dbContext.Users.AddRangeAsync(users);
        await _dbContext.Products.AddRangeAsync(products);
    }
}

using eCommerce.Models.Database.Entities;
using eCommerce.Models.Enums;
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
      Category[] categories =
      [
        new Category
        {
          Name = "Coffee"
        },
        new Category
        {
          Name = "Tea"
        },
        new Category
        {
          Name = "Others"
        }
      ];

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
          Image = "./wwwroot/images/lataBushidoCafe.png",
          Name = "La especialidad de Fígaro",
          Description = "El mejor café de \"El Alpiste\" traído hasta aquí.",
          NutritionalInfo = null,
          CategoryId = (long)ECategory.Coffee,
          Intensity = EIntensity.Strong,
          Price = 2.50M,
          Discount = 0,
          Stock = 5
        },
        new Product
        {
          Image = "./wwwroot/images/lataBushidoCafe.png",
          Name = "El té del destino",
          Description = "PD: El destino es el suspenso",
          NutritionalInfo = null,
          CategoryId = (long)ECategory.Tea,
          Intensity = EIntensity.Soft,
          Price = 1.36M,
          Discount = 0,
          Stock = 4
        }
      ];

      Review[] reviews =
      [
        new Review
        {
          Score = EScore.Positive,
          Body = "Me encanta!",
          ProductId = 1,
          UserId = 1
        },
        new Review
        {
          Score = EScore.Negative,
          Body = "Pues menuda mierda, no?",
          ProductId = 1,
          UserId = 1
        },
        new Review
        {
          Score = EScore.Positive,
          Body = "Mola mazo tron",
          ProductId = 1,
          UserId = 1
        },
        new Review
        {
          Score = EScore.Negative,
          Body = "Hola",
          ProductId = 2,
          UserId = 1
        },
        new Review
        {
          Score = EScore.Positive,
          Body = "Adios",
          ProductId = 2,
          UserId = 1
        }
      ];
      
      //Añadimos el rango de usuarios a la BDD
      await _dbContext.Categories.AddRangeAsync(categories);
      await _dbContext.Users.AddRangeAsync(users);
      await _dbContext.Products.AddRangeAsync(products);
      await _dbContext.SaveChangesAsync();
      await _dbContext.Reviews.AddRangeAsync(reviews);
    }
}
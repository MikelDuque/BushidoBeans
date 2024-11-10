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
          Image = "images/lataBushidoCafe.png",
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
        Name = "Café Espresso",
        Description = "Un espresso auténtico, fuerte y con cuerpo, ideal para comenzar el día.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)2, // Intensidad entre 0, 1 o 2
        Price = 2.50M,
        Discount = 0,
        Stock = 5
    },
    new Product
    {
        Image = "./wwwroot/images/lataBushidoCafe.png",
        Name = "Café Americano",
        Description = "Un café suave y diluido, perfecto para los que disfrutan de un sabor más ligero.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)1, // Intensidad entre 0, 1 o 2
        Price = 3.00M,
        Discount = 0,
        Stock = 8
    },
    new Product
    {
        Image = "./wwwroot/images/lataBushidoCafe.png",
        Name = "Café Latte",
        Description = "Un café suave con leche cremosa, ideal para quienes prefieren una bebida dulce.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)1, // Intensidad entre 0, 1 o 2
        Price = 3.50M,
        Discount = 0,
        Stock = 12
    },
    new Product
    {
        Image = "./wwwroot/images/lataBushidoCafe.png",
        Name = "Café Mocha",
        Description = "La combinación perfecta de café y chocolate, para los amantes del dulce.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)1, // Intensidad entre 0, 1 o 2
        Price = 3.00M,
        Discount = 0,
        Stock = 10
    },
    new Product
    {
        Image = "./wwwroot/images/lataBushidoCafe.png",
        Name = "Café Cappuccino",
        Description = "Un clásico con leche espumosa y un toque de cacao en polvo.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)1, // Intensidad entre 0, 1 o 2
        Price = 2.80M,
        Discount = 0,
        Stock = 15
    },
    new Product
    {
        Image = "./wwwroot/images/lataBushidoCafe.png",
        Name = "Café Macchiato",
        Description = "Un espresso con un toque de leche espumosa, ideal para los que buscan intensidad.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)2, // Intensidad entre 0, 1 o 2
        Price = 3.20M,
        Discount = 0,
        Stock = 7
    },
    new Product
    {
        Image = "./wwwroot/images/lataBushidoCafe.png",
        Name = "Café Cold Brew",
        Description = "Café frío, con un sabor suave y refrescante, perfecto para los días calurosos.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)0, // Intensidad entre 0, 1 o 2
        Price = 3.10M,
        Discount = 0,
        Stock = 6
    },
    new Product
    {
        Image = "/images/lataBushidoCafe.png",
        Name = "Café Irish",
        Description = "Un café con un toque de whisky irlandés, ideal para una experiencia única.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)2, // Intensidad entre 0, 1 o 2
        Price = 4.00M,
        Discount = 0,
        Stock = 3
    },
    new Product
    {
        Image = "./wwwroot/images/lataBushidoCafe.png",
        Name = "Café Frapuccino",
        Description = "Un café helado con leche y hielo, ideal para los amantes de lo dulce y refrescante.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)0, // Intensidad entre 0, 1 o 2
        Price = 3.50M,
        Discount = 0,
        Stock = 5
    },
    new Product
    {
        Image = "./wwwroot/images/lataBushidoCafe.png",
        Name = "Café de la Casa",
        Description = "Un café suave y equilibrado para todos los gustos, ideal para cualquier momento del día.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)1, // Intensidad entre 0, 1 o 2
        Price = 2.70M,
        Discount = 0,
        Stock = 9
    },
    new Product
    {
        Image = "./wwwroot/images/lataBushidoCafe.png",
        Name = "Café Vienés",
        Description = "Un café suave con nata montada, ideal para disfrutar en una tarde relajante.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)0, // Intensidad entre 0, 1 o 2
        Price = 3.30M,
        Discount = 0,
        Stock = 13
    },
    new Product
    {
        Image = "./wwwroot/images/lataBushidoCafe.png",
        Name = "Café Caramelizado",
        Description = "Café con un toque dulce de caramelo, para los que disfrutan del café con un toque especial.",
        NutritionalInfo = null,
        CategoryId = 1, // Categoría entre 1 y 3
        Intensity = (EIntensity)1, // Intensidad entre 0, 1 o 2
        Price = 2.90M,
        Discount = 0,
        Stock = 11
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
using eCommerce.Models.Database.Entities;
using eCommerce.Services;
using System.Text.Json;

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
            new Category {Name = "Coffee"},
            new Category {Name = "Tea"},
            new Category {Name = "Others"}
        ];

        User[] users =
        [
            new User {
                Mail = "mikel@gmail.es",
                Name = "Mikel",
                Password = AuthService.HashPassword("Mikel#123456789") ,
                Surname = "Platero Duque",
                Phone = 639573559,
                Image = "/images/iconMikel.jpg",
                Role = "admin",
            },
            new User {
                Mail = "david@gmail.es",
                Name = "David",
                Password = AuthService.HashPassword("David#1234567890") ,
                Surname = "Andrino Ferrera",
                Phone = 622222222,
                Image = "/images/iconDavid.png",
                Role = "admin"
            },
            new User {
                Mail = "yasir@gmail.es",
                Name = "Yasir",
                Password = AuthService.HashPassword("Yasir#1234567890") ,
                Surname = "Bel Maalem Ouhadou Abdenour",
                Phone = 633333333,
                Image = "/images/iconYasir.png",
                Role = "admin"
            },
            new User {
                Mail = "ivan@gmail.es",
                Name = "Ivan",
                Password = AuthService.HashPassword("Ivan#1234567890") ,
                Surname = "Montes Gutierrez",
                Phone = 644444444,
                Image = "/images/iconIvan.jpg",
                Role = "admin"
            },
            new User {
                Mail = "raquel@gmail.es",
                Name = "Raquel",
                Password = AuthService.HashPassword("Raquel#1234567890") ,
                Surname = "López Bermúdez",
                Phone = 644444444,
                Image = "/images/iconRaquel.jpg",
                Role = null
            }
        ];

        Product[] products = JsonSerializer.Deserialize<Product[]>(
            File.ReadAllText("Assets/Products.json")
        );

        Review[] reviews = JsonSerializer.Deserialize<Review[]>(
            File.ReadAllText("Assets/Reviews.json")
        );

        Cart[] carts =
        [
            new Cart {Id = 1}
        ];

        CartProduct[] cartProducts =
        [
            new CartProduct
            {
                CartId = 1,
                ProductId = 1,
                Quantity = 2
            },
            new CartProduct
            {
                CartId = 1,
                ProductId = 32,
                Quantity = 8
            },
            new CartProduct
            {
                CartId = 1,
                ProductId = 8,
                Quantity = 1
            },
        ];

        //Añadimos el rango de usuarios a la BDD
        await _dbContext.Categories.AddRangeAsync(categories);
        await _dbContext.SaveChangesAsync();

        await _dbContext.Users.AddRangeAsync(users);
        await _dbContext.SaveChangesAsync();

        await _dbContext.Products.AddRangeAsync(products);
        await _dbContext.SaveChangesAsync();

        await _dbContext.Carts.AddRangeAsync(carts);
        await _dbContext.CartProducts.AddRangeAsync(cartProducts);

        await _dbContext.Reviews.AddRangeAsync(reviews);
        await _dbContext.SaveChangesAsync();
    }
}
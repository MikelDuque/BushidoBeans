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
                Role = "admin",
            },
            new User {
                Mail = "david@gmail.es",
                Name = "David",
                Password = AuthService.HashPassword("David#1234567890") ,
                Surname = "Andrino Ferrera",
                Phone = 622222222,
                Role = "admin"
            },
            new User {
                Mail = "yasir@gmail.es",
                Name = "Yasir",
                Password = AuthService.HashPassword("Yasir#1234567890") ,
                Surname = "Bel Maalem Ouhadou Abdenour",
                Phone = 633333333,
                Role = "admin"
            },
            new User {
                Mail = "ivan@gmail.es",
                Name = "Ivan",
                Password = AuthService.HashPassword("Ivan#1234567890") ,
                Surname = "Montes Gutierrez",
                Phone = 644444444,
                Role = "admin"
            },
            new User {
                Mail = "raquel@gmail.es",
                Name = "Raquel",
                Password = AuthService.HashPassword("Raquel#1234567890") ,
                Surname = "López Bermúdez",
                Phone = 644444444,
                Role = null
            }
        ];

        Product[] products = JsonSerializer.Deserialize<Product[]>(
            File.ReadAllText("Assets/Products.json")
        );

        Review[] reviews = JsonSerializer.Deserialize<Review[]>(
            File.ReadAllText("Assets/Reviews.json")
        );

        /* BORRAR */
        Cart[] carts =
        [
            new Cart {Id = 1},
            new Cart {Id = 2},
            new Cart {Id = 3},
            new Cart {Id = 4}
        ];

        CartProduct[] cartProducts =
        [
            new CartProduct
            {
                UserId = 1,
                ProductId = 1,
                Quantity = 2
            },
            
            new CartProduct
            {
                UserId = 1,
                ProductId = 32,
                Quantity = 8
            },
            new CartProduct
            {
                UserId = 1,
                ProductId = 8,
                Quantity = 1
            },
            new CartProduct
            {
                UserId = 2,
                ProductId = 6,
                Quantity = 1
            },
            new CartProduct
            {
                UserId = 2,
                ProductId = 5,
                Quantity = 1
            },
            new CartProduct
            {
                UserId = 2,
                ProductId = 8,
                Quantity = 3
            },
            new CartProduct
            {
                UserId = 3,
                ProductId = 1,
                Quantity = 2
            },
            new CartProduct
            {
                UserId = 3,
                ProductId = 32,
                Quantity = 8
            },
            new CartProduct
            {
                UserId = 3,
                ProductId = 8,
                Quantity = 1
            }
            
        ];

        Address[] addresses =
        [
            new Address {
                Id = 1,
                Addressee = "Antuan",
                PhoneNumber = 738573958,
                AddressInfo = "C/ de la Mariantonieta, 58, Málaga (España)",
                UserId = 1
            }
        ];

        Order[] orders =
        [
            new Order {
                Id = 1,
                UserId = 1
            }
        ];

        OrderProduct[] orderProducts =
        [
            new OrderProduct
            {
                OrderId = 1,
                ProductId = 1,
                Quantity = 2,
                PurchasePrice = 2.5M,
            },
            
            new OrderProduct
            {
                OrderId = 1,
                ProductId = 32,
                Quantity = 8,
                PurchasePrice = 1M
            },
            new OrderProduct
            {
                OrderId = 1,
                ProductId = 8,
                Quantity = 1,
                PurchasePrice = 1.75M
            },
        ];

        //Añadimos el rango de usuarios a la BDD
        await _dbContext.Categories.AddRangeAsync(categories);
        await _dbContext.SaveChangesAsync();

        await _dbContext.Users.AddRangeAsync(users);
        await _dbContext.SaveChangesAsync();

        await _dbContext.Products.AddRangeAsync(products);
        await _dbContext.SaveChangesAsync();

        await _dbContext.Reviews.AddRangeAsync(reviews);
        await _dbContext.SaveChangesAsync();

        //await _dbContext.Carts.AddRangeAsync(carts);
        
        await _dbContext.CartProducts.AddRangeAsync(cartProducts);
        await _dbContext.SaveChangesAsync();

//        await _dbContext.Addresses.AddRangeAsync(addresses);
//        await _dbContext.SaveChangesAsync();

//        await _dbContext.Orders.AddRangeAsync(orders);
//        await _dbContext.SaveChangesAsync();

//        await _dbContext.OrderProducts.AddRangeAsync(orderProducts);
//        await _dbContext.SaveChangesAsync();
    }
}
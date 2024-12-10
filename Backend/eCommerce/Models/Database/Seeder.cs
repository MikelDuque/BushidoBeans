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
        /* ----- USERS ----- */

        User[] users =
        [
            new User {
                Mail = "mikel@gmail.es",
                Password = AuthService.HashPassword("Mikel#123456789") ,
                Name = "Mikel",
                Surname = "Platero Duque",
                Phone = 123456789,
                Role = "admin",
            },
            new User {
                Mail = "david@gmail.es",
                Password = AuthService.HashPassword("David#123456789") ,
                Name = "David",
                Surname = "Andrino Ferrera",
                Phone = 123456789,
                Role = "admin"
            },
            new User {
                Mail = "yasir@gmail.es",
                Password = AuthService.HashPassword("Yasir#123456789") ,
                Name = "Yasir",
                Surname = "Bel Maalem Ouhadou Abdenour",
                Phone = 123456789,
                Role = "admin"
            },
            new User {
                Mail = "ivan@gmail.es",
                Password = AuthService.HashPassword("Ivan#123456789") ,
                Name = "Ivan",
                Surname = "Montes Gutierrez",
                Phone = 123456789,
                Role = "admin"
            },
            new User {
                Mail = "raquel@gmail.es",
                Password = AuthService.HashPassword("Raquel#123456789") ,
                Name = "Raquel",
                Surname = "López Bermúdez",
                Phone = 123456789,
                Role = null
            },
            new User {
                Mail = "jose@gmail.es",
                Password = AuthService.HashPassword("Jose#1234567890"),
                Name = "José",
                Surname = "Santos Garrido",
                Phone = 123456789,
                Role = "admin"
            }
        ];

        Address[] addresses =
        [
            new Address {
                Addressee = "Mikel Platero Duque",
                PhoneNumber = 123456789,
                AddressInfo = "C/ de la Mariantonieta, 51, Málaga (España)",
                UserId = 1
            },
            new Address {
                Addressee = "David Andrino Ferrera",
                PhoneNumber = 123456789,
                AddressInfo = "C/ de la Mariantonieta, 52, Málaga (España)",
                UserId = 2
            },
            new Address {
                Addressee = "Yasir Bel Maalem",
                PhoneNumber = 123456789,
                AddressInfo = "C/ de la Mariantonieta, 53, Málaga (España)",
                UserId = 3
            },
            new Address {
                Addressee = "Ivan Montes Gutierrez",
                PhoneNumber = 123456789,
                AddressInfo = "C/ de la Mariantonieta, 54, Málaga (España)",
                UserId = 4
            },
            new Address {
                Addressee = "Raquel López Bermúdez",
                PhoneNumber = 123456789,
                AddressInfo = "C/ de la Mariantonieta, 55, Málaga (España)",
                UserId = 5
            },
            new Address {
                Addressee = "José Santos Garrido",
                PhoneNumber = 123456789,
                AddressInfo = "C/ de la Mariantonieta, 56, Málaga (España)",
                UserId = 6
            }
        ];


        /* ----- PRODUCTS ----- */

        Category[] categories =
        [
            new Category {Name = "Coffee"},
            new Category {Name = "Tea"},
            new Category {Name = "Others"}
        ];

        Product[] products = JsonSerializer.Deserialize<Product[]>(
            File.ReadAllText("Assets/Products.json")
        );

        Review[] reviews = JsonSerializer.Deserialize<Review[]>(
            File.ReadAllText("Assets/Reviews.json")
        );


        /* ----- SHOPING CART ----- */

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

        
        /* ----- ORDERS ----- */

        Order[] orders =
        [
            new Order {
                UserId = 1,
                AddressId = 1,
                TotalPrice = 10.5M,
                TotalProducts = 3,
                PurchaseDate = DateTime.Now
            }
        ];

        OrderProduct[] orderProducts =
        [
            new OrderProduct
            {
                OrderId = 1,
                ProductId = 1,
                Quantity = 2,
                PurchasePrice = 1.75M,
            },
            new OrderProduct
            {
                OrderId = 1,
                ProductId = 32,
                Quantity = 1,
                PurchasePrice = 3.5M
            }
        ];


        /* ----- INCLUSIÓN DATOS EN SEEDER ----- */


        //Users

        await _dbContext.Users.AddRangeAsync(users);
        await _dbContext.SaveChangesAsync();

        await _dbContext.Addresses.AddRangeAsync(addresses);
        await _dbContext.SaveChangesAsync();


        //Products

        await _dbContext.Categories.AddRangeAsync(categories);
        await _dbContext.SaveChangesAsync();

        await _dbContext.Products.AddRangeAsync(products);
        await _dbContext.SaveChangesAsync();

        await _dbContext.Reviews.AddRangeAsync(reviews);
        await _dbContext.SaveChangesAsync();


        //Cart
        
        await _dbContext.CartProducts.AddRangeAsync(cartProducts);
        await _dbContext.SaveChangesAsync();


        //Orders

        await _dbContext.Orders.AddRangeAsync(orders);
        await _dbContext.SaveChangesAsync();

        await _dbContext.OrderProducts.AddRangeAsync(orderProducts);
        await _dbContext.SaveChangesAsync();
    }
}
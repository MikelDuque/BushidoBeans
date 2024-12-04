using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database;

public class DataContext : DbContext
{
    private const string DATABASE_PATH = "BushidoDB.db";


    public DbSet<Category> Categories { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<CartProduct> CartProducts { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }
    public DbSet<Address> Addresses { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string baseDir = AppDomain.CurrentDomain.BaseDirectory;
        string connectionString = "Server=db10882.databaseasp.net; Database=db10882; Uid=db10882; Pwd=9q-Nx%Y48An!;";

        #if DEBUG
        optionsBuilder.UseSqlite($"DataSource={baseDir}{DATABASE_PATH}");
        #else
        optionsBuilder.UseMySql(connectionString,ServerVersion.AutoDetect(connectionString));
        #endif
    }
}
using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database;

public class DataContext : DbContext
{
    private const string DATABASE_PATH = "BushidoDB.db";

    //Entidades (tablas)
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Cart> Carts { get; set; }

    //Configuración del Entity Framework para la creación del archivo de BDD Sqlite
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string baseDir = AppDomain.CurrentDomain.BaseDirectory;
        optionsBuilder.UseSqlite($"DataSource={baseDir}{DATABASE_PATH}");
    }

    //Relaciones entre entidades
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Review>()
            .HasOne(rev => rev.Product)                  // Cada Review pertenece a un único Product
            .WithMany(prod => prod.Reviews)              // Cada Product puede tener muchas Reviews
            .HasForeignKey(rev => rev.ProductId);        // ProductId en Review actúa como clave foránea

        modelBuilder.Entity<Review>()
            .HasOne(rev => rev.User)                     // Cada Review es de un único User
            .WithMany(user => user.Reviews)              // Cada User puede hacer muchas Reviews
            .HasForeignKey(rev => rev.UserId);           // UserId en Review actúa como clave foránea


        modelBuilder.Entity<Cart_Product>()
            .HasKey(cartp => new { cartp.CartId, cartp.ProductId }); // PK Compuesta

        modelBuilder.Entity<Cart_Product>()
            .HasOne(cartp => cartp.Cart)                  // Cada Cartp pertenece a un único Carrito
            .WithMany(cart => cart.Cart_Products)         // Cada Carrito puede tener muchas Cartp
            .HasForeignKey(cartp => cartp.CartId);        // CartId en Cartp actúa como clave foránea

        modelBuilder.Entity<Cart_Product>()
            .HasOne(cartp => cartp.Product)               // Cada Cartp pertenece a un único Product
            .WithMany(prod => prod.Cart_Products)         // Cada Product puede tener muchas Cartp
            .HasForeignKey(cartp => cartp.ProductId);     // ProductId en Cartp actúa como clave foránea


        modelBuilder.Entity<User>()
            .HasOne(user => user.Cart)
            .WithOne(cart => cart.User)
            .HasForeignKey<Cart>(cart => cart.UserId);
    }
}
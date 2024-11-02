using System;
using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;

namespace eCommerce.Models.Database;

public class DataContext : DbContext
{
  private const string DATABASE_PATH = "BushidoDB.db";

  //Entidades (tablas)
  public DbSet<User> Users {get; set;}
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

        modelBuilder.Entity<Cart>()
            .HasKey(cart => new { cart.UserId, cart.ProductId }); // PK Compuesta

        modelBuilder.Entity<Cart>()     
            .HasOne(cart => cart.User)                  // Cada Cart pertenece a un único User
            .WithMany(user => user.Carts)               // Cada User puede tener muchas Carts
            .HasForeignKey(cart => cart.UserId);        // UserId en Cart actúa como clave foránea

        modelBuilder.Entity<Cart>()
            .HasOne(cart => cart.Product)               // Cada Cart pertenece a un único Product
            .WithMany(prod => prod.Carts)               // Cada Product puede tener muchas Carts
            .HasForeignKey(cart => cart.ProductId);     // ProductId en Cart actúa como clave foránea
    }
}
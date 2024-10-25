using eCommerce.Controllers;
using eCommerce.Models.Database;

namespace eCommerce;

public class Program
{
    public static async Task Main(string[] args) {
        //Especificamos el directorio de trabajo
        Directory.SetCurrentDirectory(AppContext.BaseDirectory);
        
        //Constructor
        var builder = WebApplication.CreateBuilder(args);

        //Controladores
        builder.Services.AddControllers();
        //Swagger/OpenApi
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        //Contextos
        builder.Services.AddScoped<DataContext>();
        builder.Services.AddScoped<UnitOfWork>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        //Habilita la autenticación
        app.UseAuthentication();
        //Habilita la autorización
        app.UseAuthorization();
        app.MapControllers();

        //Llamamos al método de creación de base de datos de respaldo (seed)
        await SeedDatabase(app.Services);

        await app.RunAsync();
    }

    static async Task SeedDatabase(IServiceProvider serviceProvider)
    {
        using IServiceScope scope = serviceProvider.CreateScope();
        using DataContext dbContext = scope.ServiceProvider.GetService<DataContext>();

        if (dbContext.Database.EnsureCreated())
        {
            Seeder seeder = new Seeder(dbContext);
            await seeder.SeedAsync();
        }
    }
}
    



using eCommerce.Controllers;
using eCommerce.Models.Database;
using eCommerce.Models.Database.Repositories;
using eCommerce.Models.Mappers;
using eCommerce.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace eCommerce;

public class Program
{
    public static async Task Main(string[] args)
    {
        //Especificamos el directorio de trabajo
        Directory.SetCurrentDirectory(AppContext.BaseDirectory);

        //Constructor
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddScoped<AuthService>();

        //Controladores
        builder.Services.AddControllers();
        //Swagger/OpenApi
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        //Contextos
        builder.Services.AddScoped<DataContext>();
        builder.Services.AddScoped<UnitOfWork>();

        builder.Services.AddScoped<UserRepository>();
        builder.Services.AddTransient<UserMapper>();

        //por defecto el navegador bloqueará las peticiones debido a la política de CORS.
        //por eso hay que habilitar Cors
        if (builder.Environment.IsDevelopment())
        {
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });
        }

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();

            //permite cors
            app.UseCors();
        }


        //Configuramos program para que use el servicio de autenticacion
        builder.Services.AddAuthentication()
                .AddJwtBearer(options =>
                {
                    //Accedemos a la clase settings donde esta el get de JwtKey (Donde se encuentra nuestra clave)
                    Settings settings = builder.Configuration.GetSection(Settings.SECTION_NAME).Get<Settings>();
                    //nuestra clave se guarda en la variable key
                    string key = settings.JwtKey;
                    //string key = Environment.GetEnvironmentVariable("JWT_KEY");

                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        //la unica validacion va a ser la clave
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
                        //Ahora creamos un controlador de api en blanco
                    };
                });

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




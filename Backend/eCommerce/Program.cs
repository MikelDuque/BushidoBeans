using eCommerce.Controllers;
using eCommerce.Models.Database;
using eCommerce.Models.Database.Repositories;
using eCommerce.Models.Mappers;
using eCommerce.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using System.Text.Json.Serialization;

namespace eCommerce;

public class Program
{
    public static async Task Main(string[] args)
    {
        //Especificamos el directorio de trabajo
        Directory.SetCurrentDirectory(AppContext.BaseDirectory);

        //Constructor
        var builder = WebApplication.CreateBuilder(args);

        //Añadir la configuración guardada en appsettings
        builder.Services.Configure<Settings>(builder.Configuration.GetSection(Settings.SECTION_NAME));

        builder.Services.AddControllers(
        options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);

        //Controladores
        builder.Services.AddControllers();

        builder.Services.AddControllers().AddJsonOptions(options => {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });

        //Contextos
        builder.Services.AddScoped<DataContext>();
        builder.Services.AddScoped<UnitOfWork>();
        builder.Services.AddScoped<CategoryRepository>();
        builder.Services.AddScoped<UserRepository>();
        builder.Services.AddScoped<ProductRepository>();
        builder.Services.AddScoped<ReviewRepository>();
        builder.Services.AddScoped<CartRepository>();
        builder.Services.AddScoped<CartProductRepository>();
        builder.Services.AddScoped<OrderRepository>();
        builder.Services.AddScoped<OrderProductRepository>();
        builder.Services.AddScoped<AddressRepository>();

        //Servicios
        builder.Services.AddScoped<TextComparer>();
        builder.Services.AddScoped<AuthService>();
        builder.Services.AddScoped<UserService>();
        builder.Services.AddScoped<ProductService>();
        builder.Services.AddScoped<ReviewService>();
        builder.Services.AddScoped<CartService>();
        builder.Services.AddScoped<OrderService>();
        builder.Services.AddScoped<AddressService>();

        //Mappers
        builder.Services.AddTransient<UserMapper>();
        builder.Services.AddTransient<ProductMapper>();
        builder.Services.AddTransient<ReviewMapper>();
        builder.Services.AddTransient<CartMapper>();
        builder.Services.AddTransient<CartProductMapper>();
        builder.Services.AddTransient<OrderMapper>();
        builder.Services.AddTransient<OrderProductMapper>();
        builder.Services.AddTransient<AddressMapper>();

        //Swagger/OpenApi
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
            {
                BearerFormat = "JWT",
                Name = "Authorization",
                Description = "Hola",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme
            });
            options.OperationFilter<SecurityRequirementsOperationFilter>(true, JwtBearerDefaults.AuthenticationScheme);
        });

        //Configuramos program para que use el servicio de autenticacion
        builder.Services.AddAuthentication()
        .AddJwtBearer(options =>
        {
            //Accedemos a la clase settings donde esta el get de JwtKey (Donde se encuentra nuestra clave)
            Settings settings = builder.Configuration.GetSection(Settings.SECTION_NAME).Get<Settings>()!;
            //nuestra clave se guarda en la variable key
            string key = settings.JwtKey;
            //string key = Environment.GetEnvironmentVariable("JWT_KEY");

            options.TokenValidationParameters = new TokenValidationParameters
            {
                //la unica validacion va a ser la clave
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
            };
        });

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
        }


        app.UseHttpsRedirection();

        //Configuración de Cors para aceptar cualquier petición
        app.UseCors(options =>
            options.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin()
        );

        //Habilita la autenticación
        app.UseAuthentication();
        //Habilita la autorización
        app.UseAuthorization();

        //Permite transmitir archivos estáticos
        app.UseStaticFiles();

        app.MapControllers();

        //Llamamos al método de creación de base de datos de respaldo (seed)
        await SeedDatabase(app.Services);

        await app.RunAsync();
    }

    static async Task SeedDatabase(IServiceProvider serviceProvider)
    {
        using IServiceScope scope = serviceProvider.CreateScope();
        using DataContext dbContext = scope.ServiceProvider.GetService<DataContext>()!;

        if (dbContext.Database.EnsureCreated())
        {
            Seeder seeder = new Seeder(dbContext);
            await seeder.SeedAsync();
        }
    }
}




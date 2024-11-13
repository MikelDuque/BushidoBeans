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
            new Category {Name = "Coffee"},
            new Category {Name = "Tea"},
            new Category {Name = "Others"}
        ];

        User[] users =
        [
            new User {
                Mail = "mikel@gmail.es",
                Name = "Mikel",
                Password = AuthService.HashPassword("Mikel#1234567890") ,
                Surname = "Platero Duque",
                Phone = 611111111,
                Role = "admin",
            },
            new User {
                Mail = "david@gmail.es",
                Name = "Mr.",
                Password = AuthService.HashPassword("David#1234567890") ,
                Surname = "Andrino",
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

        Product[] products =
        [
            new Product{
                Image = "images/lataBushidoCafe.png",
                Name = "La especialidad de Fígaro",
                Description = "El mejor café de \"El Alpiste\" traído hasta aquí.",
                NutritionalInfo = "Energia: 120 kcal, Grasas: 2g, Azúcares: 1g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Strong,
                Price = 2.50M,
                Discount = 0,
                Stock = 1
            },
            new Product{
                Image = "images/cafeEspresso.jpeg",
                Name = "Café Espresso",
                Description = "Un espresso auténtico, fuerte y con cuerpo, ideal para comenzar el día.",
                NutritionalInfo = "Energia: 100 kcal, Grasas: 1g, Azúcares: 0g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Strong,
                Price = 2.50M,
                Discount = 0,
                Stock = 5
            },
            new Product{
                Image = "images/cafeOscuro.jpeg",
                Name = "Café Americano",
                Description = "Un café suave y diluido, perfecto para los que disfrutan de un sabor más ligero.",
                NutritionalInfo = "Energia: 110 kcal, Grasas: 1g, Azúcares: 1g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Medium,
                Price = 3.00M,
                Discount = 0,
                Stock = 8
            },
            new Product{
                Image = "images/cafeLatteVainilla.jpeg",
                Name = "Café Latte",
                Description = "Un café avainillado con leche cremosa, ideal para quienes prefieren una bebida dulce.",
                NutritionalInfo = "Energia: 150 kcal, Grasas: 6g, Azúcares: 12g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Medium,
                Price = 3.50M,
                Discount = 0,
                Stock = 12
            },
            new Product{
                Image = "images/drinkHalloWeen.jpeg",
                Name = "Café HalloWeen",
                Description = "Un café terrorificamente dulce, para morir del gusto.",
                NutritionalInfo = "Energia: 160 kcal, Grasas: 7g, Azúcares: 15g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Medium,
                Price = 3.00M,
                Discount = 0,
                Stock = 10
            },
            new Product{
                Image = "images/cafeConLeche.jpeg",
                Name = "Café Cappuccino",
                Description = "Un clásico con leche espumosa y un toque de cacao en polvo.",
                NutritionalInfo = "Energia: 130 kcal, Grasas: 4g, Azúcares: 8g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Medium,
                Price = 2.80M,
                Discount = 0,
                Stock = 15
            },
            new Product{
                Image = "images/cafeVainilla.jpeg",
                Name = "Café Vainilla",
                Description = "Un espresso con sabor a vainilla, ideal para los que buscan un toque diferente.",
                NutritionalInfo = "Energia: 120 kcal, Grasas: 2g, Azúcares: 1g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Strong,
                Price = 3.20M,
                Discount = 0,
                Stock = 0
            },
            new Product{
                Image = "images/cafeFrio.jpeg",
                Name = "Café Cold Brew",
                Description = "Café frío, con un sabor suave y refrescante, perfecto para los días calurosos.",
                NutritionalInfo = "Energia: 110 kcal, Grasas: 1g, Azúcares: 0g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Soft,
                Price = 3.10M,
                Discount = 0,
                Stock = 6
            },
            new Product{
                Image = "images/cafeIrish.jpeg",
                Name = "Café Irish",
                Description = "Un café con un toque de whisky irlandés, ideal para una experiencia única.",
                NutritionalInfo = "Energia: 180 kcal, Grasas: 8g, Azúcares: 10g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Strong,
                Price = 4.00M,
                Discount = 0,
                Stock = 3
            },
            new Product{
                Image = "images/cafeHazelnut.jpeg",
                Name = "Café Avellana",
                Description = "Un café con sabor a avellana, ideal para los amantes de lo dulce y la avellana.",
                NutritionalInfo = "Energia: 140 kcal, Grasas: 5g, Azúcares: 12g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Soft,
                Price = 3.50M,
                Discount = 0,
                Stock = 5
            },
            new Product{
                Image = "images/cafent.jpeg",
                Name = "Café de la Casa",
                Description = "Un café suave y equilibrado para todos los gustos, ideal para cualquier momento del día.",
                NutritionalInfo = "Energia: 120 kcal, Grasas: 3g, Azúcares: 2g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Medium,
                Price = 2.70M,
                Discount = 0,
                Stock = 9
            },
            new Product{
                Image = "images/cafeLateChai.jpeg",
                Name = "Café Chai",
                Description = "Un café estilo chai, ideal para disfrutar en una tarde relajante.",
                NutritionalInfo = "Energia: 170 kcal, Grasas: 8g, Azúcares: 10g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Soft,
                Price = 3.30M,
                Discount = 0,
                Stock = 13
            },
            new Product{
                Image = "images/cafeCaramel.jpeg",
                Name = "Café Caramelizado",
                Description = "Café con un toque dulce de caramelo, para los que disfrutan del café con un toque especial.",
                NutritionalInfo = "Energia: 160 kcal, Grasas: 6g, Azúcares: 14g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Medium,
                Price = 2.90M,
                Discount = 0,
                Stock = 0
            },
            new Product{
                Image = "images/cafeConLeche.jpeg",
                Name = "Café Cortado",
                Description = "Un café espresso con un toque de leche, ideal para quienes prefieren una mezcla suave.",
                NutritionalInfo = "Energia: 130 kcal, Grasas: 4g, Azúcares: 2g",
                CategoryId = (long)ECategory.Coffee,
                Intensity = EIntensity.Medium,
                Price = 3.00M,
                Discount = 0,
                Stock = 0
            },
            new Product{
                Image = "images/teaHerbal.jpeg",
                Name = "Té Verde Orgánico",
                Description = "Un té verde orgánico que promueve la salud con su toque refrescante.",
                NutritionalInfo = "Energia: 5 kcal, Grasas: 0g, Azúcares: 0g",
                CategoryId = (long)ECategory.Tea,
                Intensity = EIntensity.Medium,
                Price = 2.20M,
                Discount = 0,
                Stock = 15
            },
            new Product{
                Image = "images/teNegro.jpeg",
                Name = "Té Negro",
                Description = "Un té negro clásico, ideal para una bebida revitalizante.",
                NutritionalInfo = "Energia: 10 kcal, Grasas: 0g, Azúcares: 0g",
                CategoryId = (long)ECategory.Tea,
                Intensity = EIntensity.Strong,
                Price = 2.50M,
                Discount = 0,
                Stock = 12
            },
            new Product{
                Image = "images/teDouck.jpeg",
                Name = "Té Douck",
                Description = "Un té herbal, naturalmente libre de cafeína y con un sabor suave.",
                NutritionalInfo = "Energia: 5 kcal, Grasas: 0g, Azúcares: 0g",
                CategoryId = (long)ECategory.Tea,
                Intensity = EIntensity.Medium,
                Price = 3.00M,
                Discount = 0,
                Stock = 8
            },
            new Product{
                Image = "images/teFruit.jpeg",
                Name = "Té Afrutado",
                Description = "Un té afrutado, con un sabor para los más atrevidos.",
                NutritionalInfo = "Energia: 7 kcal, Grasas: 0g, Azúcares: 0g",
                CategoryId = (long)ECategory.Tea,
                Intensity = EIntensity.Strong,
                Price = 3.20M,
                Discount = 0,
                Stock = 6
            },
            new Product{
                Image = "images/teMenta.jpeg",
                Name = "Té Menta",
                Description = "Té verde mentolado, para una experiencia floral y relajante.",
                NutritionalInfo = "Energia: 5 kcal, Grasas: 0g, Azúcares: 0g",
                CategoryId = (long)ECategory.Tea,
                Intensity = EIntensity.Medium,
                Price = 2.80M,
                Discount = 0,
                Stock = 5
            },
            new Product{
                Image = "images/teMilk.jpeg",
                Name = "Té con Leche",
                Description = "Té con leche concentrado, con un sabor umami y muchos beneficios antioxidantes.",
                NutritionalInfo = "Energia: 10 kcal, Grasas: 0g, Azúcares: 0g",
                CategoryId = (long)ECategory.Tea,
                Intensity = EIntensity.Strong,
                Price = 3.50M,
                Discount = 0,
                Stock = 0
            },
            new Product{
                Image = "images/teIced.jpeg",
                Name = "Té Frío",
                Description = "Un té refrescante con un toque dulce y floral.",
                NutritionalInfo = "Energia: 0 kcal, Grasas: 0g, Azúcares: 0g",
                CategoryId = (long)ECategory.Tea,
                Intensity = EIntensity.Medium,
                Price = 2.50M,
                Discount = 0,
                Stock = 10
            },
            new Product{
                Image = "images/teEarlGrey.jpeg",
                Name = "Té Earl Grey",
                Description = "Té negro aromatizado con aceite de bergamota, para un sabor único.",
                NutritionalInfo = "Energia: 10 kcal, Grasas: 0g, Azúcares: 0g",
                CategoryId = (long)ECategory.Tea,
                Intensity = EIntensity.Strong,
                Price = 3.10M,
                Discount = 0,
                Stock = 9
            },
            new Product{
                Image = "images/teChai.jpeg",
                Name = "Té Chai",
                Description = "Un té especiado con canela, cardamomo y otras especias, para una bebida cálida y reconfortante.",
                NutritionalInfo = "Energia: 5 kcal, Grasas: 0g, Azúcares: 0g",
                CategoryId = (long)ECategory.Tea,
                Intensity = EIntensity.Strong,
                Price = 2.90M,
                Discount = 0,
                Stock = 7
            },
            new Product{
                Image = "images/teRooibos.jpeg",
                Name = "Té Rooibos Limón",
                Description = "Rooibos con un toque de limón, refrescante y libre de cafeína.",
                NutritionalInfo = "Energia: 5 kcal, Grasas: 0g, Azúcares: 0g",
                CategoryId = (long)ECategory.Tea,
                Intensity = EIntensity.Medium,
                Price = 3.20M,
                Discount = 0,
                Stock = 6
            },
            new Product{
                Image = "images/teHibisco.jpeg",
                Name = "Té de Hibisco",
                Description = "Un té rojo, floral y ácido, perfecto para el calor del verano.",
                NutritionalInfo = "Energia: 0 kcal, Grasas: 0g, Azúcares: 0g",
                CategoryId = (long)ECategory.Tea,
                Intensity = EIntensity.Medium,
                Price = 3.00M,
                Discount = 0,
                Stock = 11
            },
            new Product{
                Image = "images/termoAcero.jpeg",
                Name = "Termo de acero inoxidable",
                Description = "Termo de alta calidad para mantener tus bebidas calientes o frías.",
                NutritionalInfo = null,
                CategoryId = (long)ECategory.Others,
                Intensity = EIntensity.No,
                Price = 15.00M,
                Discount = 0,
                Stock = 20
            },
            new Product{
                Image = "images/tazaCeramica.jpeg",
                Name = "Taza cerámica",
                Description = "Taza de cerámica con diseño exclusivo.",
                NutritionalInfo = null,
                CategoryId = (long)ECategory.Others,
                Intensity = EIntensity.No,
                Price = 7.00M,
                Discount = 0,
                Stock = 25
            },
            new Product{
                Image = "images/botellaReutilizable.jpeg",
                Name = "Botella de agua",
                Description = "Botella reutilizable para mantener tu agua fresca.",
                NutritionalInfo = null,
                CategoryId = (long)ECategory.Others,
                Intensity = EIntensity.No,
                Price = 10.00M,
                Discount = 0,
                Stock = 30
            },
            new Product{
                Image = "images/botellaTermica.jpeg",
                Name = "Botella térmica",
                Description = "Mantén tus bebidas calientes con esta botella térmica de alta calidad.",
                CategoryId = (long)ECategory.Others,
                Intensity = EIntensity.No,
                Price = 12.00M,
                Discount = 0,
                Stock = 7
            },
            new Product{
                Image = "images/cafetera.jpeg",
                Name = "Cafetera italiana",
                Description = "Cafetera para preparar un delicioso café al estilo tradicional italiano.",
                NutritionalInfo = null,
                CategoryId = (long)ECategory.Others,
                Intensity = EIntensity.No,
                Price = 18.00M,
                Discount = 0,
                Stock = 15
            },
            new Product{
                Image = "images/tazaInfusor.jpeg",
                Name = "Taza con infusor",
                Description = "Taza ideal para preparar tés de hojas sueltas.",
                NutritionalInfo = null,
                CategoryId = (long)ECategory.Others,
                Intensity = EIntensity.No,
                Price = 9.00M,
                Discount = 0,
                Stock = 22
            },
            new Product{
                Image = "images/botellaViaje.jpeg",
                Name = "Botella termal de viaje",
                Description = "Botella termal que mantiene tus bebidas a la temperatura ideal mientras viajas.",
                NutritionalInfo = null,
                CategoryId = (long)ECategory.Others,
                Intensity = EIntensity.No,
                Price = 14.00M,
                Discount = 0,
                Stock = 18
            },
            new Product{
                Image = "images/botellaTermica2.jpeg",
                Name = "Botella térmica para café",
                Description = "Botella térmica especialmente diseñada para mantener el café caliente.",
                NutritionalInfo = null,
                CategoryId = (long)ECategory.Others,
                Intensity = EIntensity.No,
                Price = 11.00M,
                Discount = 0,
                Stock = 0
            }
        ];

        Review[] reviews = [
            new Review {
                Score = EScore.Positive,
                Body = "Me encanta este café, muy fuerte y delicioso.",
                ProductId = 1,
                UserId = 1,
                PubliDate = new DateTime(2024, 11, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "Está bien, pero me esperaba algo más intenso.",
                ProductId = 1,
                UserId = 2,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un café espresso auténtico, ideal para comenzar el día.",
                ProductId = 2,
                UserId = 3,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Negative,
                Body = "No me gustó, demasiado amargo para mi gusto.",
                ProductId = 2,
                UserId = 4,
                PubliDate = new DateTime(2024, 11, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "Está bien, pero me gustaría que tuviera más sabor a café.",
                ProductId = 4,
                UserId = 2,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "La combinación de café y chocolate es perfecta, me encanta.",
                ProductId = 5,
                UserId = 3,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Negative,
                Body = "No me gustó, muy dulce para mi gusto.",
                ProductId = 5,
                UserId = 4,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un clásico, excelente con un toque de cacao.",
                ProductId = 6,
                UserId = 4,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "Está bueno, pero me gustaría que tuviera más espuma.",
                ProductId = 6,
                UserId = 5,
                PubliDate = new DateTime(2024, 11, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Perfecto para los días calurosos, refrescante y suave.",
                ProductId = 8,
                UserId = 2,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Lo mejor para el calor, muy refrescante.",
                ProductId = 8,
                UserId = 3,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un café único con un toque de whisky, increíble.",
                ProductId = 9,
                UserId = 3,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Muy refrescante y dulce, ideal para un día caluroso.",
                ProductId = 10,
                UserId = 5,
                PubliDate = new DateTime(2024, 11, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "Está bien, pero me esperaba algo más cremoso.",
                ProductId = 10,
                UserId = 1,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Perfecto para acompañar una tarde tranquila, me encanta su suavidad.",
                ProductId = 12,
                UserId = 4,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Negative,
                Body = "Demasiado dulce para mi gusto, no me convenció.",
                ProductId = 12,
                UserId = 5,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "El toque de nata montada lo hace delicioso, perfecto para una tarde relajante.",
                ProductId = 12,
                UserId = 1,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "Me gusta el sabor, pero esperaba un toque más de café en lugar de azúcar.",
                ProductId = 13,
                UserId = 2,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un toque perfecto de caramelo, me encanta la mezcla dulce con el café.",
                ProductId = 13,
                UserId = 3,
                PubliDate = new DateTime(2024, 11, 12)
            },
            new Review {
                Score = EScore.Negative,
                Body = "Demasiado dulce para mi, no volvería a pedirlo.",
                ProductId = 13,
                UserId = 4,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "Lo esperaba más fuerte, pero tiene un sabor ligero.",
                ProductId = 13,
                UserId = 1,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "El café está bien, pero no es lo suficientemente fuerte para mí.",
                ProductId = 14,
                UserId = 5,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Muy buen café, perfecto para aquellos que disfrutan un toque de leche.",
                ProductId = 14,
                UserId = 1,
                PubliDate = new DateTime(2024, 6, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Me encanta este café, muy cremoso y con un toque dulce ideal para la tarde.",
                ProductId = 14,
                UserId = 2,
                PubliDate = new DateTime(2024, 11, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un té verde muy suave y refrescante, ideal para cualquier hora del día.",
                ProductId = 15,
                UserId = 2,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un té verde orgánico con un sabor natural, excelente para la salud.",
                ProductId = 15,
                UserId = 3,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "Me gusta el té verde, pero este me pareció un poco soso.",
                ProductId = 15,
                UserId = 4,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un té verde fresco y revitalizante. Me encanta como me hace sentir.",
                ProductId = 15,
                UserId = 4,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un té con mucho sabor, perfecto para los que buscan algo natural y energizante.",
                ProductId = 15,
                UserId = 5,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Me encanta este té, tiene un sabor muy suave y natural.",
                ProductId = 17,
                UserId = 2,
                PubliDate = new DateTime(2024, 11, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "El sabor es muy sutil, no me convence del todo.",
                ProductId = 17,
                UserId = 3,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un té Oolong muy bien equilibrado, excelente para quienes disfrutan de un sabor intermedio.",
                ProductId = 18,
                UserId = 4,
                PubliDate = new DateTime(2024, 6, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "Es interesante, pero esperaba un sabor más pronunciado.",
                ProductId = 18,
                UserId = 5,
                PubliDate = new DateTime(2024, 11, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "El sabor floral del té de jazmín es maravilloso, muy relajante.",
                ProductId = 19,
                UserId = 1,
                PubliDate = new DateTime(2024, 11, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Me encanta el toque floral, perfecto para mis tardes de descanso.",
                ProductId = 19,
                UserId = 2,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Negative,
                Body = "No me gusta el sabor floral, no lo volveré a comprar.",
                ProductId = 19,
                UserId = 3,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un té matcha increíblemente refrescante, muy saludable y lleno de energía.",
                ProductId = 20,
                UserId = 4,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "No es malo, pero me resulta demasiado amargo para mi gusto.",
                ProductId = 20,
                UserId = 5,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un té suave y relajante, ideal para antes de dormir. Me gusta el toque floral.",
                ProductId = 21,
                UserId = 1,
                PubliDate = new DateTime(2024, 11, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "Demasiado suave para mí, esperaba un sabor más pronunciado.",
                ProductId = 21,
                UserId = 2,
                PubliDate = new DateTime(2024, 11, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Muy buen té para relajarse, tiene un toque dulce natural.",
                ProductId = 21,
                UserId = 3,
                PubliDate = new DateTime(2024, 6, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Me encanta este té, tiene justo el equilibrio entre sabor y suavidad.",
                ProductId = 22,
                UserId = 4,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Negative,
                Body = "No me convenció, el sabor a bergamota es muy fuerte para mi gusto.",
                ProductId = 22,
                UserId = 5,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "El Té Earl Grey tiene un sabor único, me encanta con un toque de leche.",
                ProductId = 22,
                UserId = 1,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Especiado y cálido, perfecto para las tardes frías. El toque de canela es muy sabroso.",
                ProductId = 23,
                UserId = 2,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un té Chai muy sabroso y con el balance perfecto de especias. Ideal para reconfortarse.",
                ProductId = 23,
                UserId = 3,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "Demasiado especiado para mi gusto, no volvería a comprarlo.",
                ProductId = 23,
                UserId = 4,
                PubliDate = new DateTime(2024, 6, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Un té muy refrescante, perfecto para el verano.",
                ProductId = 25,
                UserId = 3,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "Es un poco ácido para mí, no es el té que prefiero para el verano.",
                ProductId = 25,
                UserId = 4,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "El Té de Hibisco tiene un sabor único y refrescante, perfecto para los días calurosos.",
                ProductId = 25,
                UserId = 5,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Es un termo de excelente calidad, mantiene las bebidas frías por mucho tiempo.",
                ProductId = 26,
                UserId = 1,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Muy útil, mantiene el café caliente durante horas. Es bastante resistente.",
                ProductId = 26,
                UserId = 2,
                PubliDate = new DateTime(2024, 6, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "No me terminó de convencer, esperaba que fuera más duradero.",
                ProductId = 26,
                UserId = 3,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Me encanta la taza cerámica, tiene un diseño muy bonito y resistente.",
                ProductId = 27,
                UserId = 4,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "La taza tiene un diseño elegante, ideal para mi colección.",
                ProductId = 27,
                UserId = 5,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "No es lo que esperaba, el diseño no es tan atractivo como pensaba.",
                ProductId = 27,
                UserId = 1,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "La botella de agua es perfecta para llevar a todas partes, mantiene el agua fresca todo el día.",
                ProductId = 28,
                UserId = 2,
                PubliDate = new DateTime(2024, 8, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Es muy práctica y ligera, ideal para hacer ejercicio o llevar en el bolso.",
                ProductId = 28,
                UserId = 3,
                PubliDate = new DateTime(2024, 6, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "No la veo tan útil para el día a día, prefiero botellas más grandes.",
                ProductId = 28,
                UserId = 4,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "La cafetera italiana hace un café delicioso. Me encanta su diseño tradicional y su fácil uso.",
                ProductId = 30,
                UserId = 1,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Es perfecta para hacer café como en Italia. El único problema es que ocupa un poco de espacio.",
                ProductId = 30,
                UserId = 2,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Muy buena cafetera, prepara el café de forma rápida y eficaz. El sabor es inigualable.",
                ProductId = 30,
                UserId = 3,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Negative,
                Body = "No me terminó de convencer, el café sale demasiado fuerte para mi gusto.",
                ProductId = 30,
                UserId = 4,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "No es lo que esperaba, la cafetera tiene varios problemas con el goteo.",
                ProductId = 30,
                UserId = 5,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "La taza con infusor es perfecta para tés de hojas sueltas. Me encanta el diseño.",
                ProductId = 31,
                UserId = 1,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Ideal para preparar tés, el infusor es fácil de usar y el material es muy resistente.",
                ProductId = 31,
                UserId = 2,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Muy buena opción para disfrutar tés sueltos. La taza es cómoda y el infusor funciona de maravilla.",
                ProductId = 31,
                UserId = 3,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "El infusor no me gusta mucho, prefiero otros métodos para preparar té.",
                ProductId = 31,
                UserId = 4,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Me encanta la botella termal de viaje, mantiene el café caliente por horas y es muy práctica.",
                ProductId = 32,
                UserId = 5,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Perfecta para mis viajes, mantiene el café caliente todo el tiempo y no gotea.",
                ProductId = 32,
                UserId = 1,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Excelente calidad, me encanta cómo mantiene la temperatura de las bebidas durante todo el día.",
                ProductId = 32,
                UserId = 2,
                PubliDate = new DateTime(2024, 10, 12)
            },
            new Review {
                Score = EScore.Negative,
                Body = "No es tan térmica como esperaba, el café se enfría más rápido de lo que pensaba.",
                ProductId = 32,
                UserId = 3,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Regular,
                Body = "La botella se ve bien, pero no mantiene tanto el calor. Me decepcionó un poco.",
                ProductId = 32,
                UserId = 4,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "La botella térmica para café mantiene el café caliente por mucho tiempo, es muy eficiente.",
                ProductId = 33,
                UserId = 5,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Ideal para llevar café al trabajo. Muy buena calidad y mantiene el calor durante varias horas.",
                ProductId = 33,
                UserId = 1,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "Me encanta esta botella, mantiene mi café caliente como si acabara de hacerlo.",
                ProductId = 33,
                UserId = 2,
                PubliDate = new DateTime(2024, 7, 12)
            },
            new Review {
                Score = EScore.Negative,
                Body = "No es lo que esperaba, se enfría un poco más rápido de lo que me dijeron.",
                ProductId = 33,
                UserId = 3,
                PubliDate = new DateTime(2024, 9, 12)
            },
            new Review {
                Score = EScore.Positive,
                Body = "La botella térmica es práctica y perfecta para el café. Su diseño es bastante atractivo también.",
                ProductId = 33,
                UserId = 4,
                PubliDate = new DateTime(2024, 10, 12)
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
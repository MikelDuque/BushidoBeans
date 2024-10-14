using PruebaPlaywright;
using WebScrapping;

namespace WebScraping;

public class Program {
    public static async Task Main() {
        
        List<Product> listaProductosTotales = new List<Product>();

        //Anexionamos el contenido de cada lista individual a la general
        listaProductosTotales.AddRange(await WebTes.Scraping());
        listaProductosTotales.AddRange(await WebTesImportados.Scraping());
        listaProductosTotales.AddRange(await WebCafes.Scraping());
        listaProductosTotales.AddRange(await WebCafes2.Scraping());

        System.Console.WriteLine("\n=================================================\n");
        System.Console.WriteLine("Finalmente, los datos globales han sido los siguientes:\n");

        //Producto más barato
        Product cheapest = listaProductosTotales.MinBy(p => p.Price);
        Console.WriteLine($"Oferta más barata de todas:\n{cheapest} ");

        //Producto más caro
        Product expensive = listaProductosTotales.MaxBy(p => p.Price);
        Console.WriteLine($"Oferta más cara de todas:\n{expensive} ");

        //Media
        
        decimal media = listaProductosTotales.Average(p => p.Price);
        Console.WriteLine($"Media de todos los productos:\n{media} ");
    }
}
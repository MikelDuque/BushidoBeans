using PruebaPlaywright;
using WebScrapping1;

namespace WebScraping;

public class Program {
    public static async Task Main() {
        
        List<Product> listaProductosTotales = new List<Product>();

        //Anexionamos el contenido de cada lista individual a la general
        listaProductosTotales.AddRange(await WebTes.Scraping());
        listaProductosTotales.AddRange(await WebTesImportados.Scraping());
        listaProductosTotales.AddRange(await WebCafes.Scraping());

        //Producto más barato
        Product cheapest = listaProductosTotales.MinBy(p => p.Price);
        Console.WriteLine($"La oferta más barata de todas es: {cheapest} ");

        //Producto más caro
        Product expensive = listaProductosTotales.MaxBy(p => p.Price);
        Console.WriteLine($"La oferta más cara de todas es: {expensive} ");

        //Media
        
        decimal media = listaProductosTotales.Average(p => p.Price);
        Console.WriteLine($"La media de todos los productos es: {media} ");
    }
}
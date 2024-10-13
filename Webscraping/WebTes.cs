using Microsoft.Playwright;
namespace PruebaPlaywright;

public class WebTes
{
    public static async Task<List<Product>> Scraping()
    {

        Microsoft.Playwright.Program.Main(["install"]);
        using IPlaywright playwright = await Playwright.CreateAsync();
        BrowserTypeLaunchOptions options = new BrowserTypeLaunchOptions()
        {
            Headless = false // Se indica falso para poder ver el navegador
        };

        await using IBrowser browser = await playwright.Chromium.LaunchAsync(options);
        await using IBrowserContext context = await browser.NewContextAsync();
        IPage page = await context.NewPageAsync();

        // Ir a la página
        await page.GotoAsync("https://www.tasteofamerica.es/5_arizona");

        // Recorremos la lista de productos y recolectamos los datos
        List<Product> products = new List<Product>();
        IReadOnlyList<IElementHandle> productElements = await page.QuerySelectorAllAsync("article.product-miniature");

        /*
        foreach (IElementHandle productElement in productElements)
        {
            try
            {
                Product product = await GetProductAsync(productElement);
                products.Add(product);
                Console.WriteLine(product);
            }
            catch { }
        }
        */

        for(int i=0; i<10; i++) {
            try {
                Product product = await GetProductAsync(productElements[i]);
                products.Add(product);
                Console.WriteLine(product);
            }
            catch {}
        }

        // Con los datos recolectados, buscamos el producto más barato
        Product cheapest = products.MinBy(p => p.Price);
        Console.WriteLine($"La oferta más barata es: {cheapest}");

        // Con los datos recolectados, buscamos el producto más caro
        Product expensive = products.MaxBy(p => p.Price);
        Console.WriteLine($"La oferta más cara es: {expensive}");

        // Con los datos recolectados, sacamos la media
        decimal media = products.Average(p => p.Price);
        Console.WriteLine($"La media es: {media}");

        return products;
    }

    private static async Task<Product> GetProductAsync(IElementHandle element)
    {
        IElementHandle priceElement = await element.QuerySelectorAsync("span.price");
        string priceRaw = await priceElement.InnerTextAsync();
        priceRaw = priceRaw.Replace("€", "", StringComparison.OrdinalIgnoreCase);
        priceRaw = priceRaw.Trim();
        decimal price = decimal.Parse(priceRaw);

        IElementHandle nameElement = await element.QuerySelectorAsync("div.product-title");
        string name = await nameElement.InnerTextAsync();

        return new Product(name, price);
    }
}
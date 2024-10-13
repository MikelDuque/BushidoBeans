using Microsoft.Playwright;
using System.Diagnostics;

namespace WebScrapping;

public class WebCafes
{
    public static async Task<List<Product>> Scraping()
    {

        Microsoft.Playwright.Program.Main(["install"]);
        using IPlaywright playwright = await Playwright.CreateAsync();
        BrowserTypeLaunchOptions options = new BrowserTypeLaunchOptions()
        {
            Headless = false 
        };
        await using IBrowser browser = await
        playwright.Chromium.LaunchAsync(options);
        await using IBrowserContext context = await browser.NewContextAsync();
        IPage page = await context.NewPageAsync();

        await page.GotoAsync("https://www.tesco.com/groceries/en-GB/shop/drinks/coffee/iced-coffee/ready-to-drink-iced-coffee/all?sortBy=relevance&productSource=GhsAndMarketplace&count=48");

        List<Product> products = new List<Product>();
        IReadOnlyList<IElementHandle> productElements = await page.QuerySelectorAllAsync("ul li.LD7hL");

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

        for(int i=1; i<=10; i++) {
            try {
                Product product = await GetProductAsync(productElements[i]);
                products.Add(product);
                Console.WriteLine(product);
            }
            catch {}
        }
         

        // Con los datos recolectados, buscamos el producto más barato
        Product cheapest = products.MinBy(p => p.Price);
        Console.WriteLine($"La oferta más barata es: {cheapest} ");

        // Con los datos recolectados, buscamos el producto más caro
        Product expensive = products.MaxBy(p => p.Price);
        Console.WriteLine($"La oferta más cara es: {expensive} ");

        // Con los datos recolectados, buscamos la media
        
        decimal media = products.Average(p => p.Price);
        Console.WriteLine($"La media de los productos es: {media} ");

        return products;

    }
    private static async Task<Product> GetProductAsync(IElementHandle element)
    {
        IElementHandle priceElement = await element.QuerySelectorAsync("p.cXlRF");
        string priceRaw = await priceElement.InnerTextAsync();
        priceRaw = priceRaw.Replace("£", "", StringComparison.OrdinalIgnoreCase);
        priceRaw = priceRaw.Replace(".", ",", StringComparison.OrdinalIgnoreCase);
        priceRaw = priceRaw.Trim();
        decimal price = decimal.Parse(priceRaw);

        decimal tasaCambioLibraAEuro = 1.1944m;
        price = price * tasaCambioLibraAEuro;

        /*Conversión de libras a euros
        price = decimal.Multiply(price , 0.01m);
        decimal conversion = 0.047m;
        decimal price2 = decimal.Multiply(price, conversion);
        decimal truncatedValue = Math.Truncate(price2 * 1000) / 1000;
        */

        IElementHandle nameElement = await element.QuerySelectorAsync("span.bsLJsh");
        string name = await nameElement.InnerTextAsync();
        return new Product(name, price);
    }
}

using Microsoft.Playwright;
using System.Diagnostics;

namespace WebScraping;
public class WebCafes2
{
    public static async Task<List<Product>> Scraping()
    {
        using IPlaywright playwright = await Playwright.CreateAsync();
        BrowserTypeLaunchOptions options = new BrowserTypeLaunchOptions()
        {
            Headless = false // Para ver el navegador
        };
        await using IBrowser browser = await playwright.Chromium.LaunchAsync(options);
        await using IBrowserContext context = await browser.NewContextAsync();
        IPage page = await context.NewPageAsync();

        // Abrimos la página de Kaiku
        await page.GotoAsync("https://kaiku.es/tienda/?yith_wcan=1&product_cat=caffe-latte");

        // Recorremos la lista de productos y recolectamos los datos
        List<Product> products = new List<Product>();
        IReadOnlyList<IElementHandle> productElements = await page.QuerySelectorAllAsync("ul li.product");

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
        Console.WriteLine($"La oferta más barata es: {cheapest}");
        // Con los datos recolectados, buscamos el producto más caro
        Product expensive = products.MaxBy(p => p.Price);
        Console.WriteLine($"La oferta más barata es: {expensive}");
        // Con los datos recolectados, buscamos el precio del producto medio
        decimal average = products.Average(p => p.Price);
        Console.WriteLine($"La oferta media es: {average}");

        return products;
    }

    private static async Task<Product> GetProductAsync(IElementHandle element)
    {
            IElementHandle priceElement = await element.QuerySelectorAsync(".woocommerce-Price-amount");
            string priceRaw = await priceElement.InnerTextAsync();
            priceRaw = priceRaw.Replace("€", "", StringComparison.OrdinalIgnoreCase);
            priceRaw= priceRaw.Trim();
            decimal price = decimal.Parse(priceRaw);

            IElementHandle nameElement = await element.QuerySelectorAsync(".product-name");
            string name = await nameElement.InnerTextAsync();

            return new Product(name, price);
        

    }
}
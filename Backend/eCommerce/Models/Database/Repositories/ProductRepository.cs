using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Enums;
using eCommerce.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace eCommerce.Models.Database.Repositories;

public class ProductRepository : Repository<Product>
{
    public ProductRepository(DataContext dbContext) : base(dbContext)
    {
    }

    public async Task<Product> GetByIdWithReviewsAsync(object id)
    {
        return await GetQueryable().Where(product => product.Id == (long)id)
        .Include(product => product.Reviews)
        .Include(product => product.Category)
        .FirstOrDefaultAsync();
    }
    

    public async Task<int> GetTotalReviews()
    {
        return await GetQueryable().Select(product => product.Reviews).CountAsync();
    }

    public async Task<float> GetAverageScore(Object id)
    {
        Product product = await GetByIdAsync(id);
        return product.Reviews.Average(review => (float)review.Score);
    }

    //----- FILTRO -----//
    public async Task<Dictionary<int, List<Product>>> GetFilteredProducts(Filter filter)
    {
        //Creamos el diccionario que incorporará el total de productos filtrados + lista de esos productos
        Dictionary<int, List<Product>> diccionarioFinal = [];
        TextComparer _textComparer = new();

        IQueryable<Product> query = FilterByCategoryAndStock(filter.ThereStock, filter.Category);

        List<Product> listaProductosBuscados = _textComparer.SearchFilter(query, filter.Search).ToList();

        if (listaProductosBuscados.IsNullOrEmpty()) return await Task.FromResult(diccionarioFinal) ;
        
        //------------------------------------------------------------------//

        //Si la lista de productos buscados es distinta a la query original, transformala a la nueva query
        query = listaProductosBuscados == query.ToList() ? query : listaProductosBuscados.AsQueryable();

        query = ApplyOrder(query, filter.Order);

        int totalProductosFiltrados = query.Count();

        query = ApplyPagination(query, filter.CurrentPage, filter.ProductsPerPage);

        diccionarioFinal[totalProductosFiltrados] = await Task.FromResult(query.ToList());

        return diccionarioFinal;
    }


    //----- FUNCIONES DEL FILTRO -----//
    private IQueryable<Product> FilterByCategoryAndStock(bool isThereStock, ECategory category)
    {
        IQueryable<Product> query = GetQueryable().Where(product => isThereStock ? product.Stock > 0 : product.Stock <= 0);

        if(category > 0) { query = query.Where(product => product.CategoryId == (long)category); };

        return query.Include(product => product.Reviews);
    }

    private IQueryable<Product> ApplyOrder(IQueryable<Product> query, EOrder order)
    {
        IQueryable<Product> orderedQuery = order switch
        {
            EOrder.ABC_Asc => query.OrderBy(product => product.Name),
            EOrder.ABC_Desc => query.OrderByDescending(product => product.Name),
            EOrder.Price_Asc => query.OrderBy(product => product.Price),
            EOrder.Price_Desc => query.OrderByDescending(product => product.Price),
            _ => query.OrderBy(product => product.Name)
        };
        

        return orderedQuery;
    }

    private IQueryable<Product> ApplyPagination(IQueryable<Product> query, int currentPage, int productsPerPage)
    {
        int skip = (currentPage - 1) * productsPerPage;
        var paginatedQuery = query.Skip(skip).Take(productsPerPage);
        return paginatedQuery;
    }

    /*
    private IQueryable<Product> FilterByFuzzySearch(IQueryable<Product> query, string search)
    {
        string name = query.Select(product => product.Name).ToString();
        return query.Where(product => product.Name
            .Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
            .Any(word => Fuzz.Ratio(NormalizeText(search.ToLower()), NormalizeText(word.ToLower())) >= 80));
    }
    

    private IQueryable<Product> CompareText(IQueryable<Product> query, string search)
    {
        if (!string.IsNullOrWhiteSpace(search)) {
            return query.Where(product => { ClearText(product.Name).Contains(ClearText(search));
            });
        }
        return query;
    }

    // Normaliza el texto quitándole las tildes y pasándolo a minúsculas
    private List<string> ClearText(string text)
    {
        return GetTokens(RemoveDiacritics(text.ToLower())).ToList();
    }

    private string[] GetTokens(string query)
    {
        return query.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    }

    // Quita las tildes a un texto
    private string RemoveDiacritics(string text)
    {
        string normalizedString = text.Normalize(NormalizationForm.FormD);
        StringBuilder stringBuilder = new StringBuilder(normalizedString.Length);

        for (int i = 0; i < normalizedString.Length; i++)
        {
            char c = normalizedString[i];
            UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }

        return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
    }
    */
}
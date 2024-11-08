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
        return await GetQueryable().Where(product => product.Id == (long)id).Include(product => product.Reviews).FirstOrDefaultAsync();
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
    public async Task<IEnumerable<Product>> GetFilteredProducts(Filter filter)
    {
        TextComparer _textComparer = new();
        IQueryable<Product> query = FilterByCategoryAndStock(filter);

        List<Product> listaProductos = _textComparer.SearchFilter(query, filter.Search).ToList();

        
        if (listaProductos.IsNullOrEmpty())
        {
            return listaProductos;
        }

        listaProductos.ForEach(nuevoProducto => query.Where(producto => producto == nuevoProducto));
        
        query = ApplyOrder(query, filter);

        query = ApplyPagination(query, filter);

        return await query.ToListAsync();
    }

    //----- FUNCIONES DEL FILTRO -----//
    private IQueryable<Product> FilterByCategoryAndStock(Filter filter)
    {
        IQueryable<Product> query = GetQueryable().Where(product => filter.ThereStock ? product.Stock > 0 : product.Stock <= 0);

        if(filter.Category > 0) { query = query.Where(product => product.CategoryId == (long)filter.Category); };

        return query.Include(product => product.Reviews);
    }

    private IQueryable<Product> ApplyOrder(IQueryable<Product> query, Filter filter)
    {
        IQueryable<Product> orderedQuery = filter.Order switch
        {
            EOrder.ABC_Asc => query.OrderBy(product => product.Name),
            EOrder.ABC_Desc => query.OrderByDescending(product => product.Name),
            EOrder.Price_Asc => query.OrderBy(product => product.Price),
            EOrder.Price_Desc => query.OrderByDescending(product => product.Price),
            _ => query
        };

        return orderedQuery;
    }

    private IQueryable<Product> ApplyPagination(IQueryable<Product> query, Filter filter)
    {
        int skip = (filter.CurrentPage - 1) * filter.ProductsPerPage;
        var paginatedQuery = query.Skip(skip).Take(filter.ProductsPerPage);
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
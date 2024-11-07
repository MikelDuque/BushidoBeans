using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Enums;
using FuzzySharp;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class ProductRepository : Repository<Product>
{
    public ProductRepository(DataContext dbContext) : base(dbContext)
    {
    }

    /*
    public async Task<Product> GetByIdWithReviewsAsync(object id)
    {
        return await GetQueryable().Include(product => product.Reviews).FirstOrDefaultAsync();
    }
    */

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
        var query = FilterByCategoryAndStock(filter);

        if (!string.IsNullOrEmpty(filter.search))
        {
            query = FilterByFuzzySearch(query, filter.search);
        }

        query = ApplyOrder(query, filter);

        query = ApplyPagination(query, filter);

        return await query.ToListAsync();
    }

    //----- FUNCIONES DEL FILTRO -----//
    private IQueryable<Product> FilterByCategoryAndStock(Filter filter)
    {
        var query = GetQueryable()
                    .Where(product => product.CategoryId == (int)filter.category)
                    .Where(product => filter.thereStock ? product.Stock > 0 : product.Stock <= 0);

        return query;
    }

    private IQueryable<Product> FilterByFuzzySearch(IQueryable<Product> query, string search)
    {
        return query.Where(product => product.Name
            .Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
            .Any(word => Fuzz.Ratio(search, word) >= 80));
    }

    private IQueryable<Product> ApplyOrder(IQueryable<Product> query, Filter filter)
    {
        IQueryable<Product> orderedQuery = filter.order switch
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
        int skip = (filter.currentPage - 1) * filter.productsPerPage;
        var paginatedQuery = query.Skip(skip).Take(filter.productsPerPage);
        return paginatedQuery;
    }
}
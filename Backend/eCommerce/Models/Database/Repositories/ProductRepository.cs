using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using FuzzySharp;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace eCommerce.Models.Database.Repositories;

public class ProductRepository : Repository<Product>
{
    public ProductRepository(DataContext dbContext) : base(dbContext)
    {
        //WHERE con los filtros (NO incluir los NULL)
        //ORDERER BY
        //LIMIT
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

    public async Task<ICollection<Product>> GetFilteredProducts(Filter filter)
    {
        var query = FilterByCategoryAndStock(filter);

        if (!string.IsNullOrEmpty(filter.search))
        {
            query = FilterByFuzzySearch(query, filter.search);
        }

        return await query.ToListAsync();
    }

    private IQueryable<Product> FilterByCategoryAndStock(Filter filter)
    {
        var query = GetQueryable()
                    .Where(product => product.CategoryId == (int)filter.categories)
                    .Where(product => filter.thereStock ? product.Stock > 0 : product.Stock <= 0);

        return query;
    }

    private IQueryable<Product> FilterByFuzzySearch(IQueryable<Product> query, string searchTerm)
    {
        return query.Where(product => product.Name
            .Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
            .Any(word => Fuzz.Ratio(searchTerm, word) >= 80));
    }
}

//Order
//Paginación
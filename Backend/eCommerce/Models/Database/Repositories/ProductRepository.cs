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
    public async Task<ICollection<Product>> GetFilteredProducts(Filter filter)
    {
        var query = await FilterByCategoryAndStock(filter);

        if (!string.IsNullOrEmpty(filter.search))
        {
            query = await FilterByFuzzySearch(query, filter.search);
        }

        query = await ApplyOrder(query, filter);

        query = await ApplyPagination(query, filter);

        return await query.ToListAsync();
    }

    //----- FUNCIONES DEL FILTRO -----//
    private async Task<IQueryable<Product>> FilterByCategoryAndStock(Filter filter)
    {
        var query = await Task.FromResult(GetQueryable()
                    .Where(product => product.CategoryId == (int)filter.categories)
                    .Where(product => filter.thereStock ? product.Stock > 0 : product.Stock <= 0));

        return query;
    }

    private async Task<IQueryable<Product>> FilterByFuzzySearch(IQueryable<Product> query, string searchTerm)
    {
        return await Task.FromResult(query.Where(product => product.Name
            .Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
            .Any(word => Fuzz.Ratio(searchTerm, word) >= 80)));
    }

    private async Task<IQueryable<Product>> ApplyOrder(IQueryable<Product> query, Filter filter)
    {
        IQueryable<Product> orderedQuery = filter.order switch
        {
            EOrder.ABC_Asc => query.OrderBy(product => product.Name),
            EOrder.ABC_Desc => query.OrderByDescending(product => product.Name),
            EOrder.Price_Asc => query.OrderBy(product => product.Price),
            EOrder.Price_Desc => query.OrderByDescending(product => product.Price),
            _ => query
        };

        return await Task.FromResult(orderedQuery);
    }

    private async Task<IQueryable<Product>> ApplyPagination(IQueryable<Product> query, Filter filter)
    {
        int skip = (filter.currentPage - 1) * filter.productsPerPage;
        var paginatedQuery = query.Skip(skip).Take(filter.productsPerPage);
        return await Task.FromResult(paginatedQuery);
    }
}
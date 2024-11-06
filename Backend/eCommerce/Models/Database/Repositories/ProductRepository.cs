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

    //----- FILTRO -----//
    public async Task<ICollection<Product>> GetFilteredProducts(Filter filter)
    {
        var query = FilterByCategoryAndStock(filter);

        if (!string.IsNullOrEmpty(filter.search))
        {
            query = FilterByFuzzySearch(query, filter.search);
        }

        query = ApplyOrder(query, filter);

        return await query.ToListAsync();
    }

    //----- FUNCIONES DEL FILTRO -----//
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

    private IQueryable<Product> ApplyOrder(IQueryable<Product> query, Filter filter)
    {
        switch (filter.order)
        {
            case EOrder.ABC_Asc:
                return query.OrderBy(product => product.Name);
            case EOrder.ABC_Desc:
                return query.OrderByDescending(product => product.Name);
            case EOrder.Price_Asc:
                return query.OrderBy(product => product.Price);
            case EOrder.Price_Desc:
                return query.OrderByDescending(product => product.Price);
            default:
                return query;
        }
    }
}

//Paginación
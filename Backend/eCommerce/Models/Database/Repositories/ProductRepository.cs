using System.Diagnostics.Metrics;
using System.Security.Cryptography.X509Certificates;
using eCommerce.Models.Database.Entities;
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

    public async Task<int> GetTotalReviews() {
        return await GetQueryable().Select(product => product.Reviews).CountAsync();
    }

    public async Task<float> GetAverageScore() {
        return await GetQueryable().Select(review => review.Score).AverageAsync();
    }

    /*
    public async Task<ICollection<Product>> GetFilteredProducts(string name) {
        
    }
    */
}

using eCommerce.Models.Database.Entities;

namespace eCommerce.Models.Database.Repositories;

public class ProductRepository : Repository<Product>
{
    public ProductRepository(DataContext dbContext) : base(dbContext)
    {
        //WHERE con los filtros (NO incluir los NULL)
        //ORDERER BY
        //LIMIT
    }
}

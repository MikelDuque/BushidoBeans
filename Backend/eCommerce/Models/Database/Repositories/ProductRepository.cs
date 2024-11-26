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

    public async Task<Product> GetProductDetailsByIdAsync(object id)
    {
        return await GetQueryable().Where(product => product.Id == (long)id)
        .Include(product => product.Category)
        .Include(product => product.Reviews!).ThenInclude(review => review.User)
        .FirstOrDefaultAsync();
    }

    //----- FILTRO -----//
    public async Task<Dictionary<int, List<Product>>> GetFilteredProducts(Filter filter)
    {
        //Creamos el diccionario que incorporará el total de productos filtrados + lista de esos productos
        Dictionary<int, List<Product>> diccionarioFinal = [];
        TextComparer _textComparer = new();

        IQueryable<Product> query = FilterByCategoryAndStock(filter.IncludeStockless, filter.Category);

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
    private IQueryable<Product> FilterByCategoryAndStock(bool includeStockless, ECategory category)
    {
        //IQueryable<Product> query = GetQueryable().Where(product => isThereStock ? product.Stock > 0 : product.Stock <= 0);
        IQueryable<Product> query = includeStockless ? GetQueryable() : GetQueryable().Where(product => product.Stock > 0);

        if(category > 0) { query = query.Where(product => product.CategoryId == (long)category); };

        return query.Include(product => product.Category).Include(product => product.Reviews).ThenInclude(review => review.User);
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
}
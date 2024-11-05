using System;
using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Services;

public class FilterService
{
  private readonly UnitOfWork _unitOfWork;
  private readonly ProductService _productService;

  public FilterService(UnitOfWork unitOfWork, ProductService productService) {
    _unitOfWork = unitOfWork;
    _productService = productService;
  }

  /*
  public async Task<List<ProductDto>> GetFilteredProducts(Filter filter) {
    //FILTRAR PRIMERO
    
    SortedList<int, List<ProductDto>> filteredProducts = new SortedList<int, List<ProductDto>>();

    IEnumerable<ProductDto> listaProductosDB = await _productService.GetAllAsync();

    int totalPages = (int)Math.Ceiling((decimal)(listaProductosDB.Count()/filter.productsPerPage));

    foreach (ProductDto producto in listaProductosDB)
    {
      for (int i = 1; i <= totalPages; i++)
      {
        List<ProductDto> listaProductosPorPagina = new List<ProductDto>();

        for (int j = 1; j <= filter.productsPerPage; j++)
        {
          listaProductosPorPagina.Add(producto);
        }

        filteredProducts.Add(i, listaProductosPorPagina);
      }
    }
  }
  */
}

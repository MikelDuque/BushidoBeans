using System.Diagnostics;
using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;

namespace eCommerce.Services;

public class ProductService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly ProductMapper _mapper;

    public ProductService(UnitOfWork unitOfWork, ProductMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

  public async Task<Catalog> GetFilteredProducts(Filter filter)
  {
    Catalog catalog = new Catalog()
    {
      TotalPages = 0,
      FilteredProducts = []
    };

    Dictionary<int, List<Product>> categoryDictionary = await _unitOfWork.ProductRepository.GetFilteredProducts(filter);
    int totalFilteredProducts = categoryDictionary.Keys.FirstOrDefault();

    if (totalFilteredProducts > 0)
    {
      List<ProductDto> filteredProducts = [];

      filteredProducts = _mapper.ToDto(categoryDictionary[totalFilteredProducts]).ToList();

      catalog.TotalPages = (int)Math.Ceiling((double)totalFilteredProducts / filter.ProductsPerPage);
      catalog.FilteredProducts = filteredProducts;
    };

    return catalog;
  }

  /*
  public async Task<IEnumerable<ProductDto>> GetAllAsync()
  {
    IEnumerable<Product> products = await _unitOfWork.ProductRepository.GetAllAsync();
    return _mapper.ToDto(products);
  }
  */
  public async Task<ProductDto> GetByIdAsync(long id)
  {
    Product product = await _unitOfWork.ProductRepository.GetByIdWithReviewsAsync(id);
    Debug.WriteLine("Reviews", product.Reviews);
    return _mapper.ToDto(product);
  }
}

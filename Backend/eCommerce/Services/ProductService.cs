using System.Diagnostics;
using System.Net;
using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Enums;
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


  /* ----- GET ----- */
  public async Task<ProductDto> GetProductByIdAsync(long id)
  {
    Product product = await _unitOfWork.ProductRepository.GetProductDetailsByIdAsync(id);
    return _mapper.ToDto(product);
  }

  public async Task<IEnumerable<ProductDto>> GetAllAsync()
  {
    IEnumerable<Product> products = await _unitOfWork.ProductRepository.GetAllAsync();
    return _mapper.ToDto(products);
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


  /* ----- INSERT ----- */

  public async Task<ProductDto> CreateProductAsync(ProductDto product)
  {
    Product newProduct = await _unitOfWork.ProductRepository.InsertAsync(_mapper.ToEntity(product));
    await _unitOfWork.SaveAsync();

    return _mapper.ToDto(newProduct);
  }


  /* ----- UPDATE ----- */

  public async Task<ProductDto> UpdateProductDetailsAsync(ProductDto product)
  {
    Product productEntity = await _unitOfWork.ProductRepository.GetByIdAsync(product.Id) ?? throw new ArgumentException($"Product with ID {product.Id} not found.");

    productEntity = _mapper.ToEntity(product);
    _unitOfWork.ProductRepository.Update(productEntity);
    await _unitOfWork.ProductRepository.SaveAsync();

    return _mapper.ToDto(productEntity);
  }
}

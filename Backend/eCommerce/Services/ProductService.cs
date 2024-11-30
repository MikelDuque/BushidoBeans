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

  
  public async Task<ProductDto> GetByIdAsync(long id)
  {
    Product product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
    return _mapper.ToDto(product);
  }
  

  public async Task<ProductDto> GetProductDetailsAsync(long id)
  {
    Product product = await _unitOfWork.ProductRepository.GetProductDetailsByIdAsync(id);
    return _mapper.ToDto(product);
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

    public async Task<bool> CreateProductAsync(Product product)
    {
        var ProductDb = await _unitOfWork.ProductRepository.GetByIdAsync(product.Id);

        if (ProductDb != null)
        {
            throw new ArgumentException($"Product with ID {product.Id} is already created.");
        }

        await _unitOfWork.ProductRepository.InsertAsync(product);

        return await _unitOfWork.SaveAsync();

    }

    public async Task<ProductDto> UpdateProductDetailsAsync(Product product)
    {
        var ProductEntity = await _unitOfWork.ProductRepository.GetByIdAsync(product.Id);

        if (ProductEntity == null)
        {
            throw new ArgumentException($"Product with ID {product.Id} not found.");
        }

        //ProductEntity.Id = product.Id;
        ProductEntity.Name = product.Name;
        //ProductEntity.Description = product.Description;
        //ProductEntity.NutritionalInfo = product.NutritionalInfo;
        ProductEntity.Price = product.Price;
        ProductEntity.Stock = product.Stock;

        await _unitOfWork.ProductRepository.SaveAsync();

        return _mapper.ToDto(ProductEntity);

    }


    /*
    public async Task<IEnumerable<ProductDto>> GetAllAsync()
    {
      IEnumerable<Product> products = await _unitOfWork.ProductRepository.GetAllAsync();
      return _mapper.ToDto(products);
    }
    */

}

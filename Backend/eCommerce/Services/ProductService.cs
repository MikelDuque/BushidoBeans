using System;
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

  public async Task<IEnumerable<ProductDto>> GetAllAsync()
  {
    IEnumerable<Product> products = await _unitOfWork.ProductRepository.GetAllAsync();
    return _mapper.ToDto(products);
  }

  public async Task<ProductDto?> GetByIdAsync(long id)
  {
    Product? product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
    return _mapper.ToDto(product);
  }
}

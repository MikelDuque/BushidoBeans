using System;
using eCommerce.Services;
using Microsoft.AspNetCore.Mvc;
using eCommerce.Models.Dtos;

namespace eCommerce.Controllers;

//[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
  private readonly ProductService _service;

  public ProductController(ProductService service)
  {
    _service = service;
  }

  /*
  [HttpGet]
  public async Task<IEnumerable<ProductDto>> GetAllAsync()
  {
    return await _service.GetAllAsync();
  }
  */
  [HttpGet("{id}")]
  public async Task<ProductDto> GetByIdAsync(long id)
  {
    return await _service.GetByIdAsync(id);
  }
  
  [HttpGet("Filtered_Products")]
  public async Task<Catalog> GetFilteredProducts(Filter filter)
  {
    return await _service.GetFilteredProducts(filter);
  }
}

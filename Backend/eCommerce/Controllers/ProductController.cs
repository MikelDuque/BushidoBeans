using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Security.Claims;
using System.Text;

namespace eCommerce.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ProductService _service;

    public ProductController(ProductService service)
    {
        _service = service;
    }
  
  [HttpGet("{id}")]
  public async Task<ProductDto> GetProductByIdAsync(long id)
  {
    return await _service.GetProductByIdAsync(id);
  }

  [HttpGet("Filtered_Products")]
  public async Task<Catalog> GetFilteredProducts([FromBody]Filter filter)
  {
    return await _service.GetFilteredProducts(filter);
  }

  [HttpGet("Get_Products")]
  public async Task<IEnumerable<ProductDto>> GetAllAsync()
  {
    return await _service.GetAllAsync();
  }

  [Authorize(Roles = "admin")]
  [HttpPut("Update_Product")]
  public async Task<ActionResult<ProductDto>> UpdateProductAsync([FromBody]ProductDto product)
  {
    Claim userClaimId = User.FindFirst("id");
    if (userClaimId == null) return Unauthorized("Debes iniciar sesion para llevar a cabo esta accion");
   
    return Ok(await _service.UpdateProductDetailsAsync(product));
  }

  [Authorize(Roles = "admin")]
  [HttpPost("Create_Product")]
  public async Task<ActionResult<ProductDto>> CreateProductAsync([FromBody]ProductDto product)
  {
    Claim userClaimId = User.FindFirst("id");
    if (userClaimId == null) return Unauthorized("Debes iniciar sesi�n para llevar a cabo esta acci�n");
    return Ok(await _service.CreateProductAsync(product));
  }
}
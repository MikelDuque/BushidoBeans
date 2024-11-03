using System;
using eCommerce.Models.Mappers;
using eCommerce.Services;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.Controllers;

public class ProductController : ControllerBase
{
  private readonly ProductService _service;
    private readonly ProductMapper _mapper;

    public ProductController(ProductService service, ProductMapper mapper)
    {
        _service = service;
        _mapper = mapper;
    }
}

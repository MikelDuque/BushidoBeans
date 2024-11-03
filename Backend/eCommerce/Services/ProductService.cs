using System;
using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;

namespace eCommerce.Services;

public class ProductService
{
  private readonly UnitOfWork _unitOfWork;

  public ProductService(UnitOfWork unitOfWork)
  {
    _unitOfWork = unitOfWork;
  }
}

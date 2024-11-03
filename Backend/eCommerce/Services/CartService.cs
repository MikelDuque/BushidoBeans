using System;
using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;

namespace eCommerce.Services;

public class CartService
{
  private readonly UnitOfWork _unitOfWork;

  public CartService(UnitOfWork unitOfWork)
  {
    _unitOfWork = unitOfWork;
  }
}

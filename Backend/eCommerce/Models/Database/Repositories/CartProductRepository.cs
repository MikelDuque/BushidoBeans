using System;
using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class CartProductRepository : Repository<CartProduct>
{
  public CartProductRepository(DataContext dbContext) : base(dbContext)
  {
  }

  public new async Task<CartProduct> GetByIdAsync(object id)
  {
    return await GetQueryable().Where(cartProduct => cartProduct.CartId == (long)id)
    .Include(cartProduct => cartProduct.Cart)
    .Include(cartProduct => cartProduct.Product)
    .FirstOrDefaultAsync();
  }
}

using System;
using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class CartProductRepository : Repository<CartProduct>
{
  public CartProductRepository(DataContext dbContext) : base(dbContext)
  {
  }

  public new async Task<CartProduct> GetByIdAsync(object idCart, object idProduct)
  {
    return await GetQueryable().Where(cartProduct => cartProduct.CartId == (long)idCart && cartProduct.ProductId == (long)idProduct)
    .Include(cartProduct => cartProduct.Cart)
    .Include(cartProduct => cartProduct.Product)
    .FirstOrDefaultAsync();
  }

    public new async Task<bool> ExistAsync(object idCart, object idProduct)
    {
        return await GetByIdAsync(idCart, idProduct) != null;
    }
}

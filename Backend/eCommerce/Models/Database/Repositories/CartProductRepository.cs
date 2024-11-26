using System;
using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class CartProductRepository : Repository<CartProduct>
{
  public CartProductRepository(DataContext dbContext) : base(dbContext)
  {
  }

  public async Task<CartProduct> GetByIdAsync(object idUser, object idProduct)
  {
    return await GetQueryable().Where(cartProduct => cartProduct.UserId == (long)idUser && cartProduct.ProductId == (long)idProduct)
    .Include(cartProduct => cartProduct.User)
    //.Include(cartProduct => cartProduct.Cart)
    .Include(cartProduct => cartProduct.Product)
    .Include(CartProduct => CartProduct.Orders!)
    .FirstOrDefaultAsync();
  }

    public async Task<bool> ExistAsync(object idCart, object idProduct)
    {
        return await GetByIdAsync(idCart, idProduct) != null;
    }
}

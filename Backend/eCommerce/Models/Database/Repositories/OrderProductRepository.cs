using System;
using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class OrderProductRepository : Repository<OrderProduct>
{
  public OrderProductRepository(DataContext dbContext) : base(dbContext)
  {
  }

  public async Task<OrderProduct> GetByIdAsync(object idOrder, object idProduct)
  {
    return await GetQueryable().Where(orderProduct => orderProduct.OrderId == (long)idOrder && orderProduct.ProductId == (long)idProduct)
    .Include(orderProduct => orderProduct.Product)
    .FirstOrDefaultAsync();
  }

  public async Task<bool> ExistAsync(object idOrder, object idProduct)
  {
    return await GetByIdAsync(idOrder, idProduct) != null;
  }
}

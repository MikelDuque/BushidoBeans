using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Query;

namespace eCommerce.Models.Database.Repositories;

public class OrderRepository : Repository<Order>
{
  public OrderRepository(DataContext dbContext) : base(dbContext)
  {
  }

  public new async Task<Order> GetByIdAsync(object id)
  {
    return await GetQueryable().Where(order => order.Id == (long)id)
    .Include(order => order.OrderProducts).ThenInclude(orderProduct => orderProduct.Product)
    .Include(order => order.Address)
    .FirstOrDefaultAsync();
  }
}

using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class CartRepository : Repository<Cart>
{
   public CartRepository(DataContext dbContext) : base(dbContext)
   {
   }

   public new async Task<Cart> GetByIdAsync(object id)
   {
      return await GetQueryable().Where(cart => cart.Id == (long)id)
      .Include(cart => cart.CartProducts)
      .ThenInclude(cartProduct => cartProduct.Product)
      .FirstOrDefaultAsync();
   }
}

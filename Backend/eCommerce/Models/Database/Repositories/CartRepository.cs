using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class CartRepository : Repository<Cart>
{
   public CartRepository(DataContext dbContext) : base(dbContext)
   {
   }
   
   public async Task<Cart> GetCartByUserIdAsync(long userId)
    {
        return await GetQueryable().Where(cart => cart.UserId == userId)
            .Include(cart => cart.CartProducts)
            .ThenInclude(cart => cart.Product) 
            .FirstOrDefaultAsync(c => c.UserId == userId);
    }
    public void AddCart(Cart cart)
    {
        AddCart(cart);
    }
    
    public new async Task<Cart> GetByIdAsync(object id)
    {
        return await GetQueryable()
            .Include(c => c.CartProducts)
            .ThenInclude(cp => cp.Product)
            .FirstOrDefaultAsync(c => c.Id == (long)id);
    }
}

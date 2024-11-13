using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class ReviewRepository : Repository<Review>
{
   public ReviewRepository(DataContext dbContext) : base(dbContext)
   {
   }

   public new async Task<Review> GetByIdAsync(object id)
   {
      return await GetQueryable().Where(review => review.Id == (long)id)
      .Include(review => review.Product)
      .Include(review => review.User)
      .FirstOrDefaultAsync();
   }
}

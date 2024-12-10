using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class UserRepository : Repository<User>
{
    public UserRepository(DataContext dbContext) : base(dbContext)
    {

    }

    public new async Task<User> GetByIdAsync(object id)
    {
      return await GetQueryable().Where(user => user.Id == (long)id)
      .Include(user => user.Reviews)
      .Include(user => user.CartProducts).ThenInclude(cartProduct => cartProduct.Product)
      .Include(user => user.Orders)
      .Include(user => user.Addresses)
      .FirstOrDefaultAsync();
    }

    public async Task<User> GetByMailAsync(string mail)
    {
        return await GetQueryable()
        .Where(user => user.Mail == mail).SingleOrDefaultAsync();
    }

    public async Task<string> GetRoleByMailAsync(string mail)
    {
        User user = await GetByMailAsync(mail);
        return user.Role;
    }

    public async Task<bool> IsLoginCorrect(string mail, string password)
    {
        User existedUser = await GetByMailAsync(mail);
        
        if (existedUser == null) return false;
        
        return existedUser.Password == password;
    }
}
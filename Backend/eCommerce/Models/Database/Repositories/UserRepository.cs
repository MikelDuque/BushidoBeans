using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class UserRepository : Repository<User>
{
    public UserRepository (DataContext dbContext) : base(dbContext)
    {

    }

    public async Task<string> GetRoleByMailAsync(string mail) {
        User user = await GetByMailAsync(mail);
        return user.Role;
    }

    public async Task<User> GetByMailAsync(string mail)
    {
        return await GetQueryable()
        .Where(user => user.Mail == mail).SingleOrDefaultAsync();
    }

    public async Task<bool> ExistByMailAsync(string mail)
    {
        return await GetByMailAsync(mail) != null;
    }

    public async Task<bool> ThisUserExists(string mail, string password)
    {
        if (await ExistByMailAsync(mail))
        {
            User user = await GetByMailAsync(mail);
            return user.Password == password;
        }
        return false;
    }
}


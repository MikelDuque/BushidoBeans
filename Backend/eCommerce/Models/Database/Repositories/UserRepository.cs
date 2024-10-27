using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class UserRepository : Repository<User>
{
    public UserRepository (DataContext context) : base(context)
    {

    }

    //Método para obtener un usuario a partir del mail
    public async Task<User> GetByMailAsync(string mail)
    {
        return await GetQueryable()
        .Where(user => user.Mail == mail).FirstAsync();
    }
}


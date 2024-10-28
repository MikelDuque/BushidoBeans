using eCommerce.Controllers;
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

    //Especifica si existe un usuario a partir de su email
    public async Task<bool> ExistByMailAsync(string mail)
    {
        return await GetByMailAsync(mail) != null;
    }

    //Especifica si existe un usuario con mismo email y contraseña
    public async Task<bool> ThisUserExists(string mail, string password)
    {
        if (await ExistByMailAsync(mail))
        {
            var user = await GetByMailAsync(mail);
            return user.Password == password;
        }
        return false;
    }
}


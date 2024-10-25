using eCommerce.Models.Database.Entities;

namespace eCommerce.Models.Database.Repositories;

public class UserRepository : Repository<User>
{
    public UserRepository (DataContext context) : base(context)
    {
    }

    //Crear lo que queramos obtener debajo
    //public async Task method
}


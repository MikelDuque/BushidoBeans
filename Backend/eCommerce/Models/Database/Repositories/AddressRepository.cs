using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class AddressRepository : Repository<Address>
{
    public AddressRepository(DataContext dbContext) : base(dbContext)
    {
    }

}

using eCommerce.Models.Database;
using eCommerce.Models.Database.Repositories;
using System;

namespace eCommerce.Controllers;

public class UnitOfWork
{
    private readonly DataContext _dataContext;
    private UserRepository _userRepository;

    public UserRepository UserRepository => _userRepository ??= new UserRepository(_dataContext);

    public UnitOfWork(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<bool> SaveAsync()
    {
        return await _dataContext.SaveChangesAsync() > 0;
    }
}

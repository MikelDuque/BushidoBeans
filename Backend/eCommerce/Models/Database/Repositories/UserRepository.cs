﻿using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Repositories;

public class UserRepository : Repository<User>
{
    public UserRepository(DataContext dbContext) : base(dbContext)
    {

    }

    public async Task<User> GetUserDataByIdAsync(object id)
    {
      return await GetQueryable().Where(user => user.Id == (long)id)
      .Include(user => user.Reviews)
      .Include(user => user.Addresses)
      .Include(user => user.CartProducts).ThenInclude(cartProduct => cartProduct.Product)
      .Include(user => user.Orders).ThenInclude(order => order.Address)
      .Include(user => user.Orders).ThenInclude(order => order.OrderProducts).ThenInclude(orderProduct => orderProduct.Product)
      .FirstOrDefaultAsync();
    }

    public async Task<User> GetUserCartByIdAsync(object id)
    {
      return await GetQueryable().Where(user => user.Id == (long)id)
      .Include(user => user.CartProducts).ThenInclude(cartProduct => cartProduct.Product)
      .FirstOrDefaultAsync();
    }

    public async Task<User> GetUserOrdersByIdAsync(object id)
    {
      return await GetQueryable().Where(user => user.Id == (long)id)
      .Include(user => user.Orders).ThenInclude(order => order.OrderProducts).ThenInclude(orderProduct => orderProduct.Product)
      .Include(user => user.Orders).ThenInclude(order => order.Address)
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
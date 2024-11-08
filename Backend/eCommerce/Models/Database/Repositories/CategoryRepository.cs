using System;
using eCommerce.Models.Database.Entities;

namespace eCommerce.Models.Database.Repositories;

public class CategoryRepository : Repository<Category>
{
  public CategoryRepository(DataContext dbContext) : base(dbContext)
  {
  }
}

using eCommerce.Models.Database;
using eCommerce.Models.Database.Repositories;
namespace eCommerce.Controllers;

public class UnitOfWork
{
    private readonly DataContext _dataContext;
    private UserRepository _userRepository = null!;
    private ProductRepository _productRepository = null!;
    private ReviewRepository _reviewRepository = null!;

    public UserRepository UserRepository => _userRepository ??= new UserRepository(_dataContext);
    public ProductRepository ProductRepository => _productRepository ??= new ProductRepository(_dataContext);
    public ReviewRepository ReviewRepository => _reviewRepository ??= new ReviewRepository(_dataContext);

    public UnitOfWork(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<bool> SaveAsync()
    {
        return await _dataContext.SaveChangesAsync() > 0;
    }
}

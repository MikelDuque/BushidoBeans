using eCommerce.Models.Database;
using eCommerce.Models.Database.Repositories;
namespace eCommerce.Controllers;

public class UnitOfWork
{
    private readonly DataContext _dataContext;
    internal readonly object CartRepository;
    private UserRepository _userRepository = null!;
    private ProductRepository _productRepository = null!;
    private ReviewRepository _reviewRepository = null!;
    private CartRepository _cartRepository = null!;
    private CartProductRepository _cartProductRepository = null!;

    public UserRepository UserRepository => _userRepository ??= new UserRepository(_dataContext);
    public ProductRepository ProductRepository => _productRepository ??= new ProductRepository(_dataContext);
    public ReviewRepository ReviewRepository => _reviewRepository ??= new ReviewRepository(_dataContext);
    public CartRepository CartRepository => _cartRepository ??= new CartRepository(_dataContext);
    public CartProductRepository CartProductRepository => _cartProductRepository ??= new CartProductRepository(_dataContext);

    public UnitOfWork(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<bool> SaveAsync()
    {
        return await _dataContext.SaveChangesAsync() > 0;
    }
}

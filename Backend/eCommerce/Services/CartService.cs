using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Database.Repositories;

namespace eCommerce.Services;

public class CartService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly CartRepository _cartRepository;
    private readonly ProductService _productService;
    private readonly UnitOfWork _unitOfWork;
    private readonly CartRepository _cartRepository;
    private readonly ProductService _productService;

    public CartService(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Cart?> GetCartAsync(long userId)
    {
        return await _cartRepository.GetCartByUserIdAsync(userId);
    }

    public async Task<Cart> AddToCartAsync(long userId, long productId, int quantity)
    {
        var cart = await GetCartAsync(userId);

        if (cart == null)
        {
            cart = new Cart
            {
                UserId = userId,
                CartProducts = new List<CartProduct>()
            };
           _cartRepository.AddCart(cart);
        }

        var product = await _productService.GetByIdAsync(productId);
        if (product == null)
        {
            throw new Exception("Producto no encontrado");
        }

        var existingItem = cart.CartProducts.FirstOrDefault(cp => cp.ProductId == productId);

        if (existingItem != null)
        {
            existingItem.Quantity += quantity;
        }
        else
        {
            cart.CartProducts.Add(new CartProduct
            {
                CartId = cart.Id,
                ProductId = productId,
                Quantity = quantity
            });
        }

        await _unitOfWork.SaveAsync();
        return cart;
    }

    public async Task<Cart?> UpdateCartItemsAsync(long userId, long productId, int quantity)
    {
        var cart = await GetCartAsync(userId);

        if (cart == null)
        {
            return null;
        }

        var item = cart.CartProducts.FirstOrDefault(cp => cp.ProductId == productId);

        if (item != null)
        {
            item.Quantity = quantity;

            await _unitOfWork.SaveAsync();
        }

        return cart;
    }

}




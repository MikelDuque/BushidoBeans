using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Database.Repositories;
using eCommerce.Models.Mappers;

namespace eCommerce.Services;

public class CartService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly CartMapper _cartMapper;
    private readonly CartProductMapper _cartProductMapper;

    public CartService(UnitOfWork unitOfWork, CartMapper cartMapper, CartProductMapper cartProductMapper)
    {
        _unitOfWork = unitOfWork;
        _cartMapper = cartMapper;
        _cartProductMapper = cartProductMapper;
    }

    public async Task<Cart> GetCartAsync(long userId)
    {
        return await _unitOfWork.CartRepository.GetByIdAsync(userId);
        
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
            
            await _unitOfWork.CartRepository.InsertAsync(cart);
            await _unitOfWork.SaveAsync();
            

        }

        var product = await _unitOfWork.ProductRepository.GetByIdAsync(productId);
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

    public async Task<Cart> UpdateCartItemsAsync(long userId, long productId, int quantity)
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




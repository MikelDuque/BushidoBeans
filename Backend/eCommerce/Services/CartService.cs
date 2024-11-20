using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Database.Repositories;
using eCommerce.Models.Dtos;

namespace eCommerce.Services;

public class CartService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly CartRepository _cartRepository;
    private readonly ProductService _productService;
    private readonly UnitOfWork _unitOfWork;
    private readonly CartRepository _cartRepository;
    private readonly ProductService _productService;

    public CartService(UnitOfWork unitOfWork, CartRepository cartRepository, ProductService productService)
    {
        _unitOfWork = unitOfWork;
        _cartRepository = cartRepository;
        _productService = productService;
    }

    public async Task<Cart?> GetCartAsync(long userId)
    {
        return await _cartRepository.GetCartByUserIdAsync(userId);
    }

    public async Task<Cart> AddToCartAsync(CartProductDto cartProductDto)
    {
        var cart = await GetCartAsync(cartProductDto.UserId);

        if (cart == null)
        {
            cart = new Cart
            {
                UserId = cartProductDto.UserId,
                CartProducts = new List<CartProduct>()
            };
           _cartRepository.AddCart(cart);
        }

        var product = await _productService.GetByIdAsync(cartProductDto.ProductId);
        if (product == null)
        {
            throw new Exception("Producto no encontrado");
        }

        var existingItem = cart.CartProducts.FirstOrDefault(cp => cp.ProductId == cartProductDto.ProductId);

        if (existingItem != null)
        {
            existingItem.Quantity += cartProductDto.Quantity;
        }
        else
        {
            cart.CartProducts.Add(new CartProduct
            {
                ProductId = cartProductDto.ProductId,
                Quantity = cartProductDto.Quantity
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




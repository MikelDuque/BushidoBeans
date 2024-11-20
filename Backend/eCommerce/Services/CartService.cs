using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Database.Repositories;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;

namespace eCommerce.Services;

public class CartService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly CartMapper _cartMapper;

    public CartService(UnitOfWork unitOfWork, CartMapper cartMapper)
    {
        _unitOfWork = unitOfWork;
        _cartMapper = cartMapper;
    }

    public async Task<CartDto> GetCartAsync(long cartId)
    {
        Cart cart =  await _unitOfWork.CartRepository.GetByIdAsync(cartId);
        return _cartMapper.ToDto(cart);
    }

    //public async Task<Cart> AddToCartAsync(long userId, long productId, int quantity)
    //{
    //    var cart = await GetCartAsync(userId);

    //    if (cart == null)
    //    {
    //        cart = new Cart
    //        {
    //            Id = userId,
    //            CartProducts = new List<CartProduct>()
    //        };
    //       //_unitOfWork.CartRepository.Add(cart);
    //    }

    //    var product = await _unitOfWork.ProductRepository.GetByIdAsync(productId);
        
    //    if (product == null)
    //    {
    //        throw new Exception("Producto no encontrado");
    //    }

    //    var existingItem = cart.CartProducts.FirstOrDefault(cp => cp.ProductId == productId);

    //    if (existingItem != null)
    //    {
    //        existingItem.Quantity += quantity;
    //    }
    //    else
    //    {
    //        cart.CartProducts.Add(new CartProduct
    //        {
    //            CartId = cart.Id,
    //            ProductId = productId,
    //            Quantity = quantity
    //        });
    //    }

    //    await _unitOfWork.SaveAsync();
    //    return cart;
    //}

    public async Task<CartDto> UpdateCartItemsAsync(CartProduct cartProduct)
    {
        var cart = await GetCartAsync(cartProduct.CartId);

        if (cart == null)
        {
            return null;
        }

        var item = cart.CartProducts.FirstOrDefault(cartProductC => cartProductC.ProductId == cartProduct.ProductId && cartProductC.CartId == cartProduct.CartId);

        if (item != null)
        {
            item.Quantity = cartProduct.Quantity;

            await _unitOfWork.SaveAsync();
        }

        return cart;
    }

}




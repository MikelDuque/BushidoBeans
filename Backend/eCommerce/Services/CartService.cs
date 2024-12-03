using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.IdentityModel.Tokens;

namespace eCommerce.Services;
public class CartService
{
    private readonly UnitOfWork _unitOfWork;
    //private readonly CartMapper _cartMapper;
    private readonly CartProductMapper _cartProductMapper;

    public CartService(UnitOfWork unitOfWork, CartProductMapper cartProductMapper)
    {
        _unitOfWork = unitOfWork;
        //_cartMapper = cartMapper;
        _cartProductMapper = cartProductMapper;
    }


    /* ----- GET ----- */

    public async Task<List<CartProductDto>> GetCartByIdAsync(long userId)
    {
        User user = await _unitOfWork.UserRepository.GetByIdAsync(userId);

        return _cartProductMapper.ToDto(user.CartProducts).ToList();
    }


    /* ----- UPDATE ----- */

    public async Task<List<CartProductDto>> UpdateCartAsync(CartDto cart)
    {
        foreach (CartProductDto cartProduct in cart.CartProducts)
        {
            await UpdateOrInsertCartProductAsync(cartProduct);
        }

        await _unitOfWork.SaveAsync();

        return await GetCartByIdAsync(cart.Id);
    }

    public async Task<CartProductDto> UpdateCartProductAsync(CartProductDto newCartProduct)
    {
        await UpdateOrInsertCartProductAsync(newCartProduct);

        await _unitOfWork.SaveAsync();

        return newCartProduct;
    }


    /* ----- DELETE ----- */

    public async Task<bool> DeleteCartAsync(long id)
    {
        User user = await _unitOfWork.UserRepository.GetByIdAsync(id);

        foreach (CartProduct cartProduct in user.CartProducts.ToList())
        {
            _unitOfWork.CartProductRepository.Delete(cartProduct);
        }

        return await _unitOfWork.SaveAsync();
    }

    public async Task<bool> DeleteCartProductAsync(CartProduct cartProduct)
    {
        CartProduct cartProductBD = await _unitOfWork.CartProductRepository.GetByIdAsync(cartProduct.UserId, cartProduct.ProductId);
        
        _unitOfWork.CartProductRepository.Delete(cartProductBD);

        return await _unitOfWork.SaveAsync();
    }


    /* ----- FUNCIONES PRIVADAS ----- */
    private async Task<CartProduct> UpdateOrInsertCartProductAsync(CartProductDto newCartProduct)
    {
        CartProduct cartProductBD = await _unitOfWork.CartProductRepository.GetByIdAsync(newCartProduct.UserId, newCartProduct.ProductId);

        if (cartProductBD != null)
        {
            cartProductBD.Quantity = newCartProduct.Quantity;
            _unitOfWork.CartProductRepository.Update(cartProductBD);
        }
        else
        {
            CartProduct cartProduct = _cartProductMapper.ToEntity(newCartProduct);
            cartProductBD = await _unitOfWork.CartProductRepository.InsertAsync(cartProduct);
        }

        return cartProductBD;
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

    /*
    public async Task<CartProduct> UpdateCartProductAsync(CartProduct cartProduct)
    {
        CartProduct cartProductBD = await _unitOfWork.CartProductRepository.GetByIdAsync(cartProduct.CartId, cartProduct.ProductId);

        if (cartProductBD != null)
        {
            //cartProduct.Quantity += cartProductBD.Quantity;

            _unitOfWork.CartProductRepository.Update(cartProduct);
        }
        else
        {
            await _unitOfWork.CartProductRepository.InsertAsync(cartProduct);
        }

        await _unitOfWork.SaveAsync();
        return cartProduct;
    }

    public async Task<bool> DeleteCartProduct(CartProduct cartProduct)
    {
      _unitOfWork.CartProductRepository.Delete(cartProduct);
      
      return await _unitOfWork.SaveAsync();

    }

    public async Task<Cart> UpdateCartProductsAsync(Cart cart)
    {

        foreach (var cartProduct in cart.CartProducts) {
            await UpdateCartProductAsync(cartProduct); 
        }

        return cart;
    }
    */
}




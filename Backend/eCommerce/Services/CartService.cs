using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;

namespace eCommerce.Services;
public class CartService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly CartProductMapper _cartProductMapper;

    public CartService(UnitOfWork unitOfWork, CartProductMapper cartProductMapper)
    {
        _unitOfWork = unitOfWork;
        _cartProductMapper = cartProductMapper;
    }


    /* ----- GET ----- */

    public async Task<List<CartProductDto>> GetCartByIdAsync(long userId)
    {
        User user = await _unitOfWork.UserRepository.GetByIdAsync(userId);

        return _cartProductMapper.ToDto(user.CartProducts).ToList();
    }


    /* ----- UPDATE ----- */

    public async Task<List<CartProductDto>> UpdateCartAsync(Cart cart)
    {
        foreach (UpdatedCartProduct cartProduct in cart.CartProducts)
        {
            await UpdateOrInsertCartProductAsync(cartProduct);
        }

        await _unitOfWork.SaveAsync();

        return await GetCartByIdAsync(cart.Id);
    }

    public async Task<CartProductDto> UpdateCartProductAsync(UpdatedCartProduct newCartProduct)
    {
        await UpdateOrInsertCartProductAsync(newCartProduct);

        await _unitOfWork.SaveAsync();

        CartProduct cartProductBD = await _unitOfWork.CartProductRepository.GetByIdAsync(newCartProduct.UserId, newCartProduct.ProductId);

        return _cartProductMapper.ToDto(cartProductBD);
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

    public async Task<bool> DeleteCartProductAsync(UpdatedCartProduct cartProduct)
    {
        CartProduct cartProductBD = await _unitOfWork.CartProductRepository.GetByIdAsync(cartProduct.UserId, cartProduct.ProductId);
        
        _unitOfWork.CartProductRepository.Delete(cartProductBD);

        return await _unitOfWork.SaveAsync();
    }


    /* ----- FUNCIONES PRIVADAS ----- */
    private async Task<CartProduct> UpdateOrInsertCartProductAsync(UpdatedCartProduct newCartProduct)
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
}
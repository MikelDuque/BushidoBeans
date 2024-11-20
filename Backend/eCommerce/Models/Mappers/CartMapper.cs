using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class CartMapper
{

  private readonly CartProductMapper _cartProductMapper;

    public CartMapper(CartProductMapper cartProductMapper)
    {
        _cartProductMapper = cartProductMapper;
    }

  //TO DTO
  public CartDto ToDto(Cart cart)
  {
    return new CartDto()
    {
      Id = cart.Id,
      CartProducts = GetCartProductsDto(cart.CartProducts).ToList(),
    };
  }

  private IEnumerable<CartProductDto> GetCartProductsDto(IEnumerable<CartProduct> cartProducts)
  {
    return _cartProductMapper.ToDto(cartProducts);
  }
}

using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class CartProductMapper
{
   //TO DTO
   public CartProductDto ToDto(CartProduct cartProduct)
   {
       return new CartProductDto
       {
           CartId = cartProduct.CartId,
           ProductId = cartProduct.ProductId,
           Image = cartProduct.Product.Image,
           Name = cartProduct.Product.Name,
           Price = cartProduct.Product.Price,
           Quantity = cartProduct.Quantity
       };
   }
   public IEnumerable<CartProductDto> ToDto(IEnumerable<CartProduct> cartProducts)
   {
       return cartProducts.Select(ToDto);
   }
}

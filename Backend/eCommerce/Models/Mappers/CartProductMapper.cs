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
           UserId = cartProduct.UserId,
           ProductId = cartProduct.ProductId,
           Image = cartProduct.Product.Image,
           Name = cartProduct.Product.Name,
           Price = cartProduct.Product.Price,
           Stock = cartProduct.Product.Stock,
           Quantity = cartProduct.Quantity
       };
   }
   public IEnumerable<CartProductDto> ToDto(IEnumerable<CartProduct> cartProducts)
   {
       return cartProducts.Select(ToDto);
   }


   //TO ENTITY
   public CartProduct ToEntity(CartProductDto cartProductDto)
   {
    return new CartProduct
    {
        UserId = cartProductDto.UserId,
        ProductId = cartProductDto.ProductId,
        Quantity = cartProductDto.Quantity
    };
   }
    public IEnumerable<CartProduct> ToEntity(IEnumerable<CartProductDto> cartProductsDto)
   {
       return cartProductsDto.Select(ToEntity);
   }
}

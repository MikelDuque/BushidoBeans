//using eCommerce.Models.Database.Entities;
//using eCommerce.Models.Dtos;

//namespace eCommerce.Models.Mappers;

//public class CartProductMapper
//{
//    //TO DTO
//    public CartProductDto ToDto(CartProduct cartProduct)
//    {
//        return new CartProductDto
//        {
//            CartId = cartProduct.CartId,
//            ProductId = cartProduct.ProductId,
//            Quantity = cartProduct.Quantity
//        };
//    }
//    public IEnumerable<CartProductDto> ToDto(IEnumerable<CartProduct> cartProducts)
//    {
//        return cartProducts.Select(ToDto);
//    }

//    //TO ENTITY
//    public CartProduct ToEntity(CartProductDto cartProduct)
//    {
//        return new CartProduct
//        {
//            CartId = cartProduct.CartId,
//            ProductId = cartProduct.ProductId,
//            Quantity = cartProduct.Quantity
//        };
//    }
//    public IEnumerable<CartProduct> ToEntity(IEnumerable<CartProductDto> cartProducts)
//    {
//        return cartProducts.Select(ToEntity);
//    }
//}

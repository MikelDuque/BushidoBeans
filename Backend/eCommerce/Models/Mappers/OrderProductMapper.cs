using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class OrderProductMapper
{
  //TO DTO
   public OrderProductDto ToDto(OrderProduct orderProduct)
   {
       return new OrderProductDto
       {
           ProductId = orderProduct.ProductId,
           Image = orderProduct.Product.Image,
           Name = orderProduct.Product.Name,
           PurchasePrice = orderProduct.PurchasePrice,
           Quantity = orderProduct.Quantity
       };
   }
   public IEnumerable<OrderProductDto> ToDto(IEnumerable<OrderProduct> orderProducts)
   {
      return orderProducts.Select(ToDto);
   }

   //TO ENTITY
   public OrderProduct ToEntity(OrderProductDto orderProduct)
   {
       return new OrderProduct
       {
       
           ProductId = orderProduct.ProductId,
           PurchasePrice = orderProduct.PurchasePrice,
           Quantity = orderProduct.Quantity
       };
   }
   public IEnumerable<OrderProduct> ToEntity(IEnumerable<OrderProductDto> orderProducts)
   {
      return orderProducts.Select(ToEntity);
   }
}

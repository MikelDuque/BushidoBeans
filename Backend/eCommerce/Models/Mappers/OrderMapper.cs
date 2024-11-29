using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class OrderMapper
{
  private readonly OrderProductMapper _orderProductMapper;

  public OrderMapper(OrderProductMapper orderProductMapper)
  {
    _orderProductMapper = orderProductMapper;
  }

  //TO DTO
  public OrderDto ToDto(Order order)
  {
    return new OrderDto
    {
      Id = order.Id,
      TotalPrice = TotalPrice(order.OrderProducts),
      TotalProducts = TotalProducts(order.OrderProducts),
      PurchaseDate = order.PurchaseDate,
      UserId = order.UserId
    };
  }
  public IEnumerable<OrderDto> ToDto(IEnumerable<Order> orders)
  {
    return orders.Select(ToDto);
  }

  //TO ENTITY
  public Order ToEntity(OrderDto orderDto)
  {
    return new Order
    {
      Id = orderDto.Id,
      TotalPrice = orderDto.TotalPrice,
      TotalProducts = orderDto.TotalProducts,
      PurchaseDate = DateTime.Now,
      UserId = orderDto.UserId
    };
  }
  public IEnumerable<Order> ToEntity(IEnumerable<OrderDto> ordersDto)
  {
    return ordersDto.Select(ToEntity);
  }


  /* FUNCIONES PRIVADAS */

  private decimal TotalPrice(IEnumerable<OrderProduct> orderProducts) {
    decimal totalPrice = 0;

    orderProducts.ToList().ForEach((orderProduct) => totalPrice += orderProduct.PurchasePrice);

    return totalPrice;
  }

  private int TotalProducts(IEnumerable<OrderProduct> orderProducts) {
    
    int totalProducts = 0;

    orderProducts.ToList().ForEach((product) => totalProducts += product.Quantity);

    return totalProducts;
  }
}

using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class OrderMapper
{
  private readonly OrderProductMapper _orderProductMapper;
  private readonly AddressMapper _addressMapper;

  public OrderMapper(OrderProductMapper orderProductMapper, AddressMapper addressMapper)
  {
    _orderProductMapper = orderProductMapper;
    _addressMapper = addressMapper;
  }

  //TO DTO
  public OrderDto ToDto(Order order)
  {
    return new OrderDto
    {
      Id = order.Id,
      TotalPrice = order.TotalPrice,
      TotalProducts = order.TotalProducts,
      PurchaseDate = order.PurchaseDate,
      UserId = order.UserId,
      Address = _addressMapper.ToDto(order.Address),
      OrderProducts = _orderProductMapper.ToDto(order.OrderProducts).ToList()
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
      TotalPrice = orderDto.TotalPrice,
      TotalProducts = orderDto.TotalProducts,
      PurchaseDate = orderDto.PurchaseDate,
      UserId = orderDto.UserId,
      AddressId = orderDto.AddressId
    };
  }
  public IEnumerable<Order> ToEntity(IEnumerable<OrderDto> ordersDto)
  {
    return ordersDto.Select(ToEntity);
  }
}

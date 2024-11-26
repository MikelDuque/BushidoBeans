using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class OrderMapper
{
  private readonly CartProductMapper _cartProductMapper;

  public OrderMapper(CartProductMapper cartProductMapper)
  {
    _cartProductMapper = cartProductMapper;
  }

  //TO DTO
  public OrderDto ToDto(Order order)
  {
    return new OrderDto
    {
      Id = order.Id,
      TotalPrice = TotalPrice(order.User.CartProducts),
      PurchaseDate = order.PurchaseDate,
      CartProducts = GetCartProductsDto(order.User.CartProducts).ToList()
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
      PurchaseDate = DateTime.Now,
      UserId = orderDto.UserId
    };
  }
  public IEnumerable<Order> ToEntity(IEnumerable<OrderDto> ordersDto)
  {
    return ordersDto.Select(ToEntity);
  }

  //OTRAS FUNCIONES
  private IEnumerable<CartProductDto> GetCartProductsDto(IEnumerable<CartProduct> cartProducts)
  {
    return _cartProductMapper.ToDto(cartProducts);
  }
  
  private decimal TotalPrice(IEnumerable<CartProduct> cartProducts) {
    
    List<CartProductDto> productList = GetCartProductsDto(cartProducts).ToList();
    decimal totalPrice = 0;

    productList.ForEach((product) => totalPrice += product.Price);

    return totalPrice;
  }
}

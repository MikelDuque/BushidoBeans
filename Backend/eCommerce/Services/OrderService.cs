using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;

namespace eCommerce.Services
{
    public class OrderService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly OrderMapper _orderMapper;

        public OrderService(UnitOfWork unitOfWork, OrderMapper orderMapper)
        {
            _unitOfWork = unitOfWork;
            _orderMapper = orderMapper;
        }

        public async Task<List<OrderDto>> GetOrderAsync(long userId)
        {
            User user = await _unitOfWork.UserRepository.GetByIdAsync(userId);
            return _orderMapper.ToDto(user.Orders).ToList();
        }

        public async Task<OrderDto> CreateOrderAsync(Order order)
        {

            List<CartProduct> cartProducts = await GetCartProducts(order.UserId);

            OrderDto newOrderDto = new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId
            };

            await _unitOfWork.OrderRepository.InsertAsync(_orderMapper.ToEntity(newOrderDto));
            await _unitOfWork.SaveAsync();

            return newOrderDto;
        }

        private async Task<List<CartProduct>> GetCartProducts(long userId)
        {
            User user =  await _unitOfWork.UserRepository.GetByIdAsync(userId);
            return user.CartProducts;
        }
        

    }


}

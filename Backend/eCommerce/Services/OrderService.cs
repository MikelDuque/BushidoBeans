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

    }


}

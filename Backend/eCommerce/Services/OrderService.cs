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

        public async Task<Order> GetOrderAsync(long orderId)
        {
            return await _unitOfWork.OrderRepository.GetByIdAsync(orderId);
        }

        public async Task<bool> CreateOrderAsync(OrderDto order)
        {

            Order newOrder = new Order
            {
                UserId = order.UserId,
                TotalPrice = await TotalPrice(order.UserId),
                TotalProducts = await TotalProducts(order.UserId),
                PurchaseDate = DateTime.Now
                
            };

            await _unitOfWork.OrderRepository.InsertAsync(newOrder);

            return await _unitOfWork.SaveAsync();

            
        }

        private async Task<List<CartProduct>> GetCartProducts(long orderId)
        {
            User user =  await _unitOfWork.UserRepository.GetByIdAsync(orderId);
            return user.CartProducts;
        }

        private async Task<decimal> TotalPrice(long orderId)
        {

            List<CartProduct> productList = await GetCartProducts(orderId);
            decimal totalPrice = 0;

            productList.ForEach((orderProduct) => totalPrice += orderProduct.Product.Price);

            return totalPrice;
        }

        private async Task<int> TotalProducts(long orderId)
        {

            List<CartProduct> productList = await GetCartProducts(orderId);
            int totalProducts = 0;

            productList.ForEach((orderProduct) => totalProducts += orderProduct.Quantity);

            return totalProducts;
        }
    }


}

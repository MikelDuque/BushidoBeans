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

        public async Task<Order> GetOrderAsync(long userId)
        {
            User user = await _unitOfWork.UserRepository.GetByIdAsync(userId);
            return user.Orders.FirstOrDefault();
        }

        public async Task<bool> CreateOrderAsync(Order order)
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

        private async Task<List<CartProduct>> GetCartProducts(long userId)
        {
            User user =  await _unitOfWork.UserRepository.GetByIdAsync(userId);
            return user.CartProducts;
        }

        private async Task<decimal> TotalPrice(long userId)
        {

            List<CartProduct> productList = await GetCartProducts(userId);
            decimal totalPrice = 0;

            productList.ForEach((cartProduct) => totalPrice += cartProduct.Product.Price);

            return totalPrice;
        }

        private async Task<int> TotalProducts(long userId)
        {

            List<CartProduct> productList = await GetCartProducts(userId);
            int totalProducts = 0;

            productList.ForEach((cartProduct) => totalProducts += cartProduct.Quantity);

            return totalProducts;
        }
    }


}

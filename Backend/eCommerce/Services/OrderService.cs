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

        public async Task<bool> DeleteAsyncOrderById(long id) {
            Order order = await _unitOfWork.OrderRepository.GetByIdAsync(id);
            
            _unitOfWork.OrderRepository.Delete(order);

            foreach (OrderProduct orderProduct in order.OrderProducts.ToList())
            {
                await DeleteOrderProductAsync(orderProduct);
            }

            return await _unitOfWork.SaveAsync();
        } 

        public async Task<bool> DeleteOrderProductAsync(OrderProduct orderProduct)
        {
            _unitOfWork.OrderProductRepository.Delete(orderProduct);

            return await _unitOfWork.SaveAsync();
        }

        
        /* OTROS MÉTODOS */

        private async Task<List<OrderProduct>> GetOrderProducts(long orderId)
        {
            Order order =  await _unitOfWork.OrderRepository.GetByIdAsync(orderId);
            return order.OrderProducts.ToList();
        }

        private async Task<decimal> TotalPrice(long orderId)
        {

            List<OrderProduct> orderProductList = await GetOrderProducts(orderId);
            decimal totalPrice = 0;

            orderProductList.ForEach((orderProduct) => totalPrice += orderProduct.Product.Price * orderProduct.Quantity);

            return totalPrice;
        }

        private async Task<int> TotalProducts(long orderId)
        {

            List<OrderProduct> orderProductList = await GetOrderProducts(orderId);
            int totalProducts = 0;

            orderProductList.ForEach((orderProduct) => totalProducts += orderProduct.Quantity);

            return totalProducts;
        }
    }


}

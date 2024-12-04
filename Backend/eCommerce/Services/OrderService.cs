using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.IdentityModel.Tokens;

namespace eCommerce.Services;

public class OrderService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly OrderMapper _orderMapper;
    private readonly OrderProductMapper _orderProductMapper;

    public OrderService(UnitOfWork unitOfWork, OrderMapper orderMapper, OrderProductMapper orderProductMapper)
    {
        _unitOfWork = unitOfWork;
        _orderMapper = orderMapper;
        _orderProductMapper = orderProductMapper;
    }


    /* ----- GET ----- */

    public async Task<OrderDto> GetOrderByIdAsync(long orderId)
    {
        Order order = await _unitOfWork.OrderRepository.GetByIdAsync(orderId);

        return _orderMapper.ToDto(order);
    }


    /* ----- INSERT ----- */

    public async Task<OrderDto> InsertOrderAsync(OrderDto order)
    {

        Order newOrder = new Order
        {
            UserId = order.UserId,
            TotalPrice = order.OrderProducts.Aggregate<OrderProductDto, decimal>(0, (total, orderProduct) => total += orderProduct.Quantity * orderProduct.PurchasePrice),
            TotalProducts = order.OrderProducts.Sum((orderProduct) => orderProduct.Quantity),
            PurchaseDate = DateTime.Now 
        };

        await _unitOfWork.OrderRepository.InsertAsync(newOrder);

        //await InsertOrderProductsAsync(order.OrderProducts);

        await _unitOfWork.SaveAsync();

        return order;
    }

   
    /* ----- DELETE ----- */

    public async Task<bool> DeleteOrderByIdAsync(long id) {
        Order orderBD = await _unitOfWork.OrderRepository.GetByIdAsync(id);
        
        _unitOfWork.OrderRepository.Delete(orderBD);

        /*
        foreach (OrderProduct orderProduct in order.OrderProducts.ToList())
        {
            await DeleteOrderProductAsync(orderProduct);
        }
        */

        return await _unitOfWork.SaveAsync();
    } 
/*
    public async Task<bool> DeleteOrderProductAsync(OrderProduct orderProduct)
    {
        _unitOfWork.OrderProductRepository.Delete(orderProduct);

        return await _unitOfWork.SaveAsync();
    }
*/

    /* ----- FUNCIONES PRIVADAS  ----- */

     private async Task InsertOrderProductsAsync(List<OrderProductDto> newOrderProducts) {

        List<OrderProduct> orderProducts = _orderProductMapper.ToEntity(newOrderProducts).ToList();

        foreach (OrderProduct orderProduct in orderProducts)
        {
            await _unitOfWork.OrderProductRepository.InsertAsync(orderProduct);
        }
    }
}
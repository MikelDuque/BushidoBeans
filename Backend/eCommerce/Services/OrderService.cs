﻿using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;

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

    public async Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(long userId)
    {
        User thisUser = await _unitOfWork.UserRepository.GetUserOrdersByIdAsync(userId);

        return _orderMapper.ToDto(thisUser.Orders);
    }


    /* ----- INSERT ----- */
    public async Task<OrderDto> InsertOrderAsync(OrderDto order)
    {

        Order newOrder = new Order
        {
            UserId = order.UserId,
            TotalPrice = order.OrderProducts.Aggregate<OrderProductDto, decimal>(0, (total, orderProduct) => total += orderProduct.Quantity * orderProduct.PurchasePrice),
            TotalProducts = order.OrderProducts.Sum((orderProduct) => orderProduct.Quantity),
            PurchaseDate = DateTime.Now,
            AddressId = order.AddressId,
            OrderProducts = _orderProductMapper.ToEntity(order.OrderProducts).ToList()
        };

        Order preFinalOrder = await _unitOfWork.OrderRepository.InsertAsync(newOrder);
        ChangePoductsStock(order.OrderProducts);
        
        await _unitOfWork.SaveAsync();

        Order finalOrder = await _unitOfWork.OrderRepository.GetByIdAsync(preFinalOrder.Id);

        return _orderMapper.ToDto(finalOrder);
    }

   
    /* ----- DELETE ----- */

    public async Task<bool> DeleteOrderByIdAsync(long id) {
        Order orderBD = await _unitOfWork.OrderRepository.GetByIdAsync(id);
        
        _unitOfWork.OrderRepository.Delete(orderBD);

        return await _unitOfWork.SaveAsync();
    }


    /* ----- FUNCIONES PRIVADAS ----- */
    
    private async void ChangePoductsStock(List<OrderProductDto> orderProducts) {
        foreach (OrderProductDto product in orderProducts)
        {
            Product productEntity = await _unitOfWork.ProductRepository.GetByIdAsync(product.ProductId) ?? throw new ArgumentException("El producto no ha sido encontrado");
            productEntity.Stock -= product.Quantity;
            _unitOfWork.ProductRepository.Update(productEntity);
        }
    }
}
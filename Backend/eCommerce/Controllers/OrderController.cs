using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace eCommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }


        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetOrderByIdAsync(long id)
        {
            return Ok(await _orderService.GetOrderByIdAsync(id));
        }
        
        [HttpPost("Insert_Order")]
        public async Task<ActionResult> PostOrder([FromBody]OrderDto order)
        {
            return Ok(await _orderService.InsertOrderAsync(order));
        }

        //[Authorize]
        [HttpGet("Get_Orders")]
        public async Task<ActionResult> GetOrdersByUserIdAsync(long userId)
        {
            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }

    }
}

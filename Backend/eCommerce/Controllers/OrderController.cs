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
        public async Task<Order> GetOrderByIdAsync(long id)
        {
            return await _orderService.GetOrderAsync(id);
        }
        /*
        [HttpPost("Insert_Order")]
        public async Task<ActionResult> PostOrder([FromBody]OrderDto order)
        {
            await _orderService.CreateOrderAsync(order);
            return Ok();
        }
        /*

        [HttpPost("Update_Cart")]
        public async Task<ActionResult> UpdateCartAsync([FromBody] List<CartProduct> cartProducts)
        {
            Claim userClaimId = User.FindFirst("id");

            if (userClaimId == null) return Unauthorized("Usuario no autorizado");

            await _cartService.UpdateCartProductsAsync(cartProducts);

            return Ok(cartProducts);

        }
        */
    }
}

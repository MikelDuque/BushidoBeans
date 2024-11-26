using eCommerce.Models.Database.Entities;
using eCommerce.Services;
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

        [HttpGet("{id}")]
        public async Task<ActionResult> GetOrderByIdAsync(long id)
        {
            return Ok(await _orderService.GetOrderAsync(id));
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

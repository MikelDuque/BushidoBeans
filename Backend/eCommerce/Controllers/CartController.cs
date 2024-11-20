using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }

        //[Authorize]
        [HttpGet("{id}")]
        public async Task<CartDto> GetCartByIdAsync(long id)
        {
            return await _cartService.GetCartAsync(id);
        }


        //[Authorize]
        [HttpPut("/update")]
        public async Task<ActionResult<CartDto>> UpdateCart([FromQuery] CartProduct cartProduct)
        {

            if (cartProduct == null) return BadRequest("Datos del producto no válidos.");

            return await _cartService.UpdateCartItemsAsync(cartProduct);
        }

    }
}

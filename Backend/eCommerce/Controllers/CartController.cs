using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService) { 
            _cartService = cartService;
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCart(long userId) { 
            var cart = await _cartService.GetCartAsync(userId);
            if (cart == null) { return NotFound(); }
            return Ok(cart);
        }

        [HttpPost("{userId}/add")]
        public async Task<IActionResult> AddToCart([FromBody] CartProductDto cartProductDto)
        {
            var cart = await _cartService.AddToCartAsync(cartProductDto);
            return Ok(cart);
        }

        [HttpPut("{userId}/update")]
        public async Task<IActionResult> UpdateCart(long userId, [FromBody] CartProductDto cartProductDto)
        {
            var cart = await _cartService.UpdateCartItemsAsync(userId, cartProductDto.ProductId, cartProductDto.Quantity);
            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart);
        }
    }
}

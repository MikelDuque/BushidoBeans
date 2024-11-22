using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpGet("Get_Cart")]
        public async Task<CartDto> GetCartByIdAsync(long id)
        {
            return await _cartService.GetCartAsync(id);
        }

        [Authorize]
        [HttpPost("Add_CartProduct")]
        public async Task<ActionResult<CartProduct>> UpdateCart([FromBody] CartProduct cartProduct)
        {
            try
            {
                if (cartProduct == null) return BadRequest("Datos del producto no válidos.");

                var updatedCartProduct = await _cartService.UpdateCartItemsAsync(cartProduct);
                return Ok(updatedCartProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error en el servidor", details = ex.Message });
            }
        }




        [Authorize]
        [HttpDelete("Delete_CartProduct")]
        public async void DeleteCartProduct([FromQuery] CartProduct cartProduct)
        {
            
            _cartService.DeleteCartProduct(cartProduct); 
        }
    }
}

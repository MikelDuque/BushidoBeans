using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [HttpGet("Get_Cart")]
        public async Task<CartDto> GetCartByIdAsync(long id)
        {
            return await _cartService.GetCartAsync(id);
        }


        //[Authorize]
        [HttpPut("Update_CartProduct")]
        public ActionResult<CartProduct> UpdateCart([FromQuery] CartProduct cartProduct)
        {

            if (cartProduct == null) return BadRequest("Datos del producto no válidos.");

            return  Ok (_cartService.UpdateCartProductAsync(cartProduct));
        }

        [HttpDelete("Delete_CartProduct")]
        public async Task<ActionResult> DeleteCartProduct([FromQuery] CartProduct cartProduct)
        {
            try
            {
                await _cartService.DeleteCartProduct(cartProduct); 
            }
            catch (Exception)
            {
                return BadRequest("El item ha eliminar no existe en la base de datos");
            }
            
            return NoContent();
        }

        [HttpGet("Update_GlobalCart")]
        public async Task<List<CartProduct>> GetCartAsync([FromQuery]List<CartProduct> cartProduct)
        {
       
            await _cartService.UpdateCartProductsAsync(cartProduct);
            return cartProduct;
            
        }
    }
}

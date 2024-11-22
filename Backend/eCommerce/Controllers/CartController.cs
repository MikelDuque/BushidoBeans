using eCommerce.Models.Database.Entities;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


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
        public async Task<ActionResult> GetCartByIdAsync(long id)
        {
            Claim userClaimId = User.FindFirst("id");

            if (userClaimId == null) return Unauthorized("Usuario no autorizado"); 
            

            return Ok(await _cartService.GetCartAsync(id));

        }

        [Authorize]
        [HttpDelete("Delete_CartContent")]
        public async Task<ActionResult> DeleteCartByIdAsync([FromQuery] long id)
        {
            Claim userClaimId = User.FindFirst("id");
            

            if (userClaimId == null) return Unauthorized("Usuario no autorizado");

            try
            {
                await _cartService.DeleteCartAsync(id);
                
                return NoContent();

            }
            catch (Exception)
            {
                return BadRequest("El item ha eliminar no existe en la base de datos");
            }

        }


        [Authorize]
        [HttpPost("Update_CartProduct")]
        public ActionResult<CartProduct> UpdateCart([FromQuery] CartProduct cartProduct)
        {

            Claim userClaimId = User.FindFirst("id");

            if (userClaimId == null)return Unauthorized("Usuario no autorizado");

            if (cartProduct == null) return BadRequest("Datos del producto no válidos.");

            return  Ok (_cartService.UpdateCartProductAsync(cartProduct));
        }



        [Authorize]
        [HttpDelete("Delete_CartProduct")]
        public async Task<ActionResult> DeleteCartProduct([FromQuery] CartProduct cartProduct)
        {
            Claim userClaimId = User.FindFirst("id");

            if (userClaimId == null) return Unauthorized("Usuario no autorizado");

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




        [Authorize]
        [HttpPut("Update_GlobalCart")]
        public async Task<ActionResult> GetCartAsync([FromBody]Cart cart)
        {
            Claim userClaimId = User.FindFirst("id");

            if (userClaimId == null)return Unauthorized("Usuario no autorizado");

            await _cartService.UpdateCartProductsAsync(cart);
            return Ok(cart);
            
        }
    }
}

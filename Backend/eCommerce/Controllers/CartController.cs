using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
        [HttpGet("{id}")]
        public async Task<ActionResult> GetCartByIdAsync(long id)
        {
            Claim userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized("Usuario no autorizado");

            List<CartProductDto> cartList = await _cartService.GetCartAsync(id);
            if (cartList.IsNullOrEmpty()) return BadRequest("El carrito está vacío");
            return Ok(cartList);
        }

        [Authorize]
        [HttpPut("Update_Cart")]
        public async Task<ActionResult> UpdateCartAsync([FromBody] CartDto cart)
        {
            Claim userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized("Usuario no autorizado");

            List<CartProductDto> cartProducts = await _cartService.UpdateCartAsync(cart);
            return Ok(cartProducts);
        }

        [Authorize]
        [HttpPut("Update_CartProduct")]
        public ActionResult<bool> UpdateCart([FromBody] CartProduct cartProduct)
        {
            Claim userClaimId = User.FindFirst("id");
            if (cartProduct == null) return BadRequest("Datos del producto no válidos.");

            if (userClaimId == null) return Unauthorized("Usuario no autorizado");
            return Ok(_cartService.UpdateCartProductAsync(cartProduct));
        }

        [Authorize]
        [HttpDelete("Delete_Cart/{id}")]
        public async Task<ActionResult> DeleteCartByIdAsync([FromBody] long id)
        {
            Claim userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized("Usuario no autorizado");

            try { return Ok(await _cartService.DeleteCartAsync(id));}
            catch (Exception) {return BadRequest("El item ha eliminar no existe en la base de datos");}
        }

        [Authorize]
        [HttpDelete("Delete_CartProduct")]
        public async Task<ActionResult> DeleteCartProduct([FromBody] CartProduct cartProduct)
        {
            Claim userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized("Usuario no autorizado");

            try {return Ok( await _cartService.DeleteCartProductAsync(cartProduct));}
            catch (Exception) { return BadRequest("El item ha eliminar no existe en la base de datos");}
        }

    }
}

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
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> GetCartByIdAsync(long id)
        {
            Claim userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized("Debes iniciar sesión para llevar a cabo esta acción");

            if (id <= 0) return BadRequest(new {Message= "El ID del usuario es inválido."});
            List<CartProductDto> cartList = await _cartService.GetCartByIdAsync(id);
            if (cartList.IsNullOrEmpty()) return BadRequest(new {message = "El carrito está vacío"});
            return Ok(cartList);
        }

        [HttpPut("Update_Cart")]
        public async Task<ActionResult> UpdateCartAsync([FromBody] Cart cart)
        {
            if (cart == null) return BadRequest(new {Message= "El carrito a actualizar es inválido."});
            if (cart.Id <= 0) return BadRequest(new {Message= "El ID del usuario es inválido."});
            return Ok(await _cartService.UpdateCartAsync(cart));
        }

        [HttpPut("Update_CartProduct")]
        public ActionResult<bool> UpdateCartProductAsync([FromBody] UpdatedCartProduct cartProduct)
        {
            Claim userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized("Debes iniciar sesión para llevar a cabo esta acción");

            if (cartProduct == null) return BadRequest(new { message = "Datos del producto no válidos." });
            return Ok(_cartService.UpdateCartProductAsync(cartProduct));
        }

        [HttpDelete("Delete_Cart/{id}")]
        public async Task<ActionResult> DeleteCartByIdAsync(long id)
        {
            Claim userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized("Debes iniciar sesión para llevar a cabo esta acción");

            if (id <= 0) return BadRequest(new {Message= "El ID del usuario es inválido."});
            try {return Ok(await _cartService.DeleteCartAsync(id));}
            catch (NullReferenceException) {return BadRequest(new {message = "El item a eliminar no existe en la base de datos"});}
        }

        [HttpDelete("Delete_CartProduct")]
        public async Task<ActionResult> DeleteCartProductAsync([FromBody] UpdatedCartProduct cartProduct)
        {
            Claim userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized("Debes iniciar sesión para llevar a cabo esta acción");

            if (cartProduct == null) return BadRequest(new {Message= "El producto a eliminar es inválido."});
            try {return Ok( await _cartService.DeleteCartProductAsync(cartProduct));}
            catch (Exception) { return BadRequest(new {message = "El item ha eliminar no existe en la base de datos"});}
        }

    }
}

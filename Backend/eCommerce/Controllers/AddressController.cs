using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace eCommerce.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AddressController : Controller
{
    private readonly AddressService _service;

    public AddressController(AddressService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetByIdAsync(long id)
    {
        if (id <= 0) return BadRequest(new {Message= "El ID de la dirección introducido es inválido"});
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpGet("Get_User_Addresses/{id}")]
    public async Task<IActionResult> GetAllAddresses(long id)
    {

        Claim userClaimId = User.FindFirst("id");
        if (userClaimId == null) return Unauthorized(new {Message = "Debe iniciar sesión para llevar a cabo esta acción"});

        if (id <= 0) return BadRequest(new {Message= "El ID del usuario es inválido."});
        try
        {
            IEnumerable<AddressDto> addresses = await _service.GetAllByUserIdAsync(id);
            if (addresses == null || !addresses.Any()) return NotFound("No se encontraron direcciones para este usuario.");
            return Ok(addresses);
        }
        catch (Exception ex) {return StatusCode(500, $"Error al obtener las direcciones: {ex.Message}");}
    }

    [HttpPost("Insert_Address")]
    public async Task<IActionResult> InsertAddress([FromBody] AddressDto addressDto)
    {
        Claim userClaimId = User.FindFirst("id");
        if (userClaimId == null) return Unauthorized(new {Message = "Debe iniciar sesión para llevar a cabo esta acción"});

        if (addressDto == null) return BadRequest(new {Message = "Se requiere la dirección."});

        bool success = await _service.CreateAddressAsync(addressDto);
        if (!success) return StatusCode(500, "Hubo un error al crear la dirección.");
        
        return Ok(new {Message = "Dirección creada correctamente."});
    }

    [HttpDelete("Delete_Address/{id}")]
    public async Task<IActionResult> DeleteAddress(long id)
    {
        Claim userClaimId = User.FindFirst("id");
        if (userClaimId == null) return Unauthorized(new {Message = "Debe iniciar sesión para llevar a cabo esta acción"});


        if (id <= 0) return BadRequest(new {Message= "El ID de la dirección es inválido."});
        bool isDeleted = await _service.DeleteAddressAsync(id);
        if (!isDeleted) return NotFound(new {Message = "Dirección no encontrada" });

        return Ok(new {Message = "Dirección eliminada correctamente" });
    }
}
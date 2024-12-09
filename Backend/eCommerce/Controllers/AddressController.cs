using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace eCommerce.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AddressController : Controller
{
    private readonly AddressService _service;

    public AddressController(AddressService service)
    {
        _service = service;
    }


    [HttpGet("{id}")]
    public async Task<AddressDto> GetByIdAsync(long id)
    {
        return await _service.GetByIdAsync(id);
    }

    [HttpPost("Insert_Address")]
    public async Task<IActionResult> InsertAddress([FromBody] AddressDto addressDto)
    {
        if (addressDto == null)
        {
            return BadRequest("Se requiere la dirección.");
        }

        bool success = await _service.CreateAddressAsync(addressDto);

        if (success)
        {
            return Ok("Dirección creada correctamente.");
        }

        return StatusCode(500, "Hubo un error al crear la dirección.");
    }

    [HttpGet("Get_All_Addresses")]
    public async Task<IActionResult> GetAllAddresses([FromQuery] long userId)
    {
        try
        {
            // Valida que se haya enviado el userId
            if (userId <= 0)
            {
                return BadRequest("El ID del usuario es inválido.");
            }

            // Llama al servicio para obtener las direcciones del usuario
            var addresses = await _service.GetAllByUserIdAsync(userId);

            if (addresses == null || !addresses.Any())
            {
                return NotFound("No se encontraron direcciones para este usuario.");
            }

            return Ok(addresses);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al obtener las direcciones: {ex.Message}");
        }
    }
    [HttpDelete("Delete_Address")]
    public async Task<IActionResult> DeleteAddress(long id)
    {
        bool isDeleted = await _service.DeleteAddressAsync(id);

        if (!isDeleted)
        {
            return NotFound(new { Message = "Address not found" });
        }

        return Ok(new { Message = "Address deleted successfully" });
    }



}
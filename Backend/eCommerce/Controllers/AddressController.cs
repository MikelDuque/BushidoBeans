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

    [Authorize]
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

}
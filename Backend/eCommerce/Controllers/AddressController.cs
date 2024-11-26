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
    public async Task<ActionResult<Review>> CreateAddressAsync([FromBody] Address address)
    {
        Claim userClaimId = User.FindFirst("id");

        if (userClaimId == null) return Unauthorized("Usuario no autorizado");

        if (address == null) return BadRequest("Datos de la reseña no válidos.");

        return await _service.CreateAddressAsync(address);
    }
}
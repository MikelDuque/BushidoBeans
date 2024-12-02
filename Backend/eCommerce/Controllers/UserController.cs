using System.Security.Claims;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserService _service;

    public UserController(UserService service)
    {
        _service = service;
    }


    [HttpGet("{id}")]
    public async Task<ActionResult> GetByIdAsync(long id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpGet("Get_Users")]
    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        return await _service.GetAllAsync();
    }

    [Authorize]
    [HttpPut("Update")]
    public async Task<ActionResult<UserDto>> UpdateAsync(User user)
    {
        Claim userClaimId = User.FindFirst("id");
        if (userClaimId == null) return Unauthorized("Debes iniciar sesión para llevar a cabo esta acción");

        return Ok(await _service.UpdateAsync(user));
    }


    [Authorize(Roles = "admin")]
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<UserDto>> DeleteAsyncUser(long id)
    {
        Claim userClaimRole = User.FindFirst("role");
        if (userClaimRole == null) return Unauthorized("Usuario no autorizado");

        await _service.DeleteAsyncUserById(id);

        return NoContent();
    }
    
}
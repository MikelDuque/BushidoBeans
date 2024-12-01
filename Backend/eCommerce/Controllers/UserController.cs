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
    public async Task<UserDto> GetByIdAsync(long id)
    {
        return await _service.GetByIdAsync(id);
    }

    [HttpPut("Update")]
    public async Task<ActionResult<UserDto>> UpdateAsync(User user)
    {
        return Ok(await _service.UpdateAsync(user));
    }

    [HttpPost("Register")]
    public async Task<ActionResult<UserDto>> InsertAsyncByMail(RegisterRequest userRequest)
    {
        try
        {
            UserDto userDto = await _service.InsertByMailAsync(userRequest);
            return Ok(userDto);
        }
        catch(Exception ex) {
            return BadRequest(ex.Message);
        }
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<UserDto>> DeleteAsyncUser(long id)
    {
        await _service.DeleteAsyncUserById(id);

        return NoContent();
    }
    
}
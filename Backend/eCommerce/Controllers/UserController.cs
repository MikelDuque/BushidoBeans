using eCommerce.Models.Dtos;
using eCommerce.Services;
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

    [HttpGet]
    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        return await _service.GetAllAsync();
    }

    /*
    [HttpPut("{id}")]
    public async Task<ActionResult<UserDto>> UpdateAsync(long id, User user)
    {
        return Ok(await _service.UpdateAsync(id, user));
    }
    */

    [HttpPost("Registro")]
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

    /*
    [HttpDelete("{id}")]
    public async Task<ActionResult<UserDto>> DeleteAsync(long id)
    {
        await _service.DeleteAsync(id);

        return NoContent();
    }
    */
}
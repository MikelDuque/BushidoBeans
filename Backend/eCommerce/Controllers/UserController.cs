using eCommerce.Models.Database.Entities;
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

    /*
    [HttpGet]
    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        return await _service.GetAllAsync();
    }
    */
    [HttpGet("{id}")]
    public async Task<UserDto> GetByIdAsync(long id)
    {
        return await _service.GetByIdAsync(id);
    }

    /*
    [HttpPut("{id}")]
    public async Task<ActionResult<UserDto>> UpdateAsync(long id, User user)
    {
        return Ok(await _service.UpdateAsync(id, user));
    }
    */

    [HttpPost]
    public async Task<ActionResult<UserDto>> InsertAsyncByMail(RegisterRequest userRequest)
    {
        return await _service.InsertByMailAsync(userRequest);
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

using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;
using eCommerce.Services;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.Controllers;
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserService _service;
    private readonly UserMapper _mapper;

    public UserController(UserService service, UserMapper mapper)
    {
        _service = service;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        IEnumerable<User> users = await _service.GetAllAsync();

        return _mapper.ToDto(users);
    }

    [HttpGet("{id}")]
    public async Task<UserDto> GetByIdAsync(long id)
    {
        User user = await _service.GetByIdAsync(id);

        return _mapper.ToDto(user);
    }
/*
    [HttpPost]
    public async Task<ActionResult<UserDto>> InsertAsync(User user)
    {
        User newUser = await _service.InsertAsync(user);

        return _mapper.ToDto(newUser);
    }
*/
    [HttpPost]
    public async Task<ActionResult<UserDto>> InsertAsyncByMail(RegisterRequest userRequest) { 
        User user = new User {
            Mail = userRequest.Mail,
            Password = AuthService.HashPassword(userRequest.Password),
            Name = userRequest.Name,
            Surname = "",
            Phone = 0,
            Role = null
        };

        User newUser = await _service.InsertAsync(user);
        
        return _mapper.ToDto(newUser);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<UserDto>> UpdateAsync(long id, User user)
    {
        User userUpdated = await _service.UpdateAsync(id, user);

        return Ok(_mapper.ToDto(userUpdated));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<UserDto>> DeleteAsync(long id)
    {
        await _service.DeleteAsync(id);

        return NoContent();
    }
}

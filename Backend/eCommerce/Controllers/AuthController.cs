using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace eCommerce.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly TokenValidationParameters _tokenParameters;
    private readonly UserService _userService;
    private readonly AuthService _authService;

    public AuthController(IOptionsMonitor<JwtBearerOptions> jwtOptions, UserService userService, AuthService authService)
    {
        _tokenParameters = jwtOptions.Get(JwtBearerDefaults.AuthenticationScheme)
        .TokenValidationParameters;

        _userService = userService;
        _authService = authService;
    }


    [HttpPost("Login")]
    public async Task<ActionResult> Login([FromBody] LoginRequest model)
    {
        bool isCorrect = await _userService.IsLoginCorrect(model.Mail, model.Password);
        
        if (!isCorrect) return BadRequest(new {message = "Email o contraseña incorrectos"});

        string stringToken = await _authService.Login(model);
        return Ok(new LoginResult { AccessToken = stringToken });
    }

    [HttpPost("Register")]
    public async Task<ActionResult> Register([FromBody] RegisterRequest userRequest)
    {     
        if (await _userService.GetByMailAsync(userRequest.Mail) != null)
        {
            return BadRequest(new {message = "El usuario ya existe"});
        }

        string stringToken = await _authService.Register(userRequest);
        return Ok(new LoginResult { AccessToken = stringToken });
    }
}

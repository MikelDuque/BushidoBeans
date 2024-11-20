using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace eCommerce.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    // Obtenemos por inyeccion los parametros preestablecidos para crear los token
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

    [HttpPost("Inicio_Sesion")]
    public async Task<ActionResult<LoginResult>> Login([FromBody] LoginRequest model)
    {
        bool userExists = await _userService.ThisUserExists(model.Mail, model.Password);
        
        if (userExists)
        {
            string stringToken = await _authService.LoginResult(model);
            return Ok(new LoginResult { AccessToken = stringToken });
        }
        else
        {
            return Unauthorized("Email o contraseña incorrectos");
        }
    }
}

using eCommerce.Models.Database.Repositories;
using eCommerce.Models.Dtos;
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

    private readonly UserRepository _userRepository;

    public AuthController(IOptionsMonitor<JwtBearerOptions> jwtOptions, UserRepository userRepository)
    {
        _tokenParameters = jwtOptions.Get(JwtBearerDefaults.AuthenticationScheme)
        .TokenValidationParameters;

        _userRepository = userRepository;
    }

    // El atributo AllowAnonymous indica que la peticion/controlador puede ser accedida 
    // sin necesidad de autenticarse, aquo sepodroa obviar ya que el controlador no tiene el atributo Authorize.
    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult<LoginResult>> Login([FromBody] LoginRequest model)
    {
        // Si el usuario existe entonces creamos y le damos su token
        bool userExists = await _userRepository.ThisUserExists(model.Mail, model.Password);
        if (userExists)
        {
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                // Aqui añadimos los datos que sirvan para autorizar al usuario
                Claims = new Dictionary<string, object>
            {
                // Para el id, Microsoft propone usar el ClaimTypes.NameIdentifier
                { "id", Guid.NewGuid().ToString() },
                { ClaimTypes.Name, model.Mail },
                { ClaimTypes.Role, model.Admin }
            },
                // Aqui indicamos cuando caduca el token
                Expires = DateTime.UtcNow.AddDays(5),
                // Aqui especificamos nuestra clave y el algoritmo de firmado
                SigningCredentials = new SigningCredentials(
                _tokenParameters.IssuerSigningKey,
                SecurityAlgorithms.HmacSha256Signature)
            };

            // Creamos el token y se lo devolvemos al usuario logeado
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string stringToken = tokenHandler.WriteToken(token);

            return Ok(new LoginResult { AccessToken = stringToken });
        }
        else
        {
            // Si el usuario no existe, lo notificamos.
            // Por seguridad, aunque solo esta incorrecto un campo, se debe indicar al usuario que ambos son incorrectos.
            return Unauthorized("Email o contraseña incorrectos");
        }
    }

    [Authorize(Roles = "admin")]
    [HttpGet]
    public string GetSecret()
    {
        return "Esto es un secreto que no todo el mundo deberia leer";
    }
}

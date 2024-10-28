using eCommerce.Models.Database.Repositories;
using eCommerce.Models.Dtos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace eCommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public AuthController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // Obtenemos por inyección los parámetros preestablecidos para crear los token
        private readonly TokenValidationParameters _tokenParameters;

        public AuthController(IOptionsMonitor<JwtBearerOptions> jwtOptions)
        {
            _tokenParameters = jwtOptions.Get(JwtBearerDefaults.AuthenticationScheme)
                .TokenValidationParameters;
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public string GetSecret()
        {
            return "Esto es un secreto que no todo el mundo debería leer";
        }


        // El atributo AllowAnonymous indica que la petición/controlador puede ser accedida 
        // sin necesidad de autenticarse, aquí sepodría obviar ya que es el controlador no tiene el atributo Authorize.
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
                    // Aquí añadimos los datos que sirvan para autorizar al usuario
                    Claims = new Dictionary<string, object>
                {
                    // Para el id, Microsoft propone usar el ClaimTypes.NameIdentifier
                    { "id", Guid.NewGuid().ToString() },
                    { ClaimTypes.Name, model.Mail },
                    { ClaimTypes.Role, model.Admin }
                },
                    // Aquí indicamos cuándo caduca el token
                    Expires = DateTime.UtcNow.AddDays(5),
                    // Aquí especificamos nuestra clave y el algoritmo de firmado
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
                // Por seguridad, aunque solo esté incorrecto un campo, se debe indicar al usuario que ambos son incorrectos.
                return Unauthorized("Email o contraseña incorrecto");
            }


        }
    }
}

using eCommerce.Controllers;
using eCommerce.Models.Dtos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace eCommerce.Services;
public class AuthService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly TokenValidationParameters _tokenParameters;

    public AuthService(UnitOfWork unitOfWork, IOptionsMonitor<JwtBearerOptions> jwtOptions)
    {
        _unitOfWork = unitOfWork;
        _tokenParameters = jwtOptions.Get(JwtBearerDefaults.AuthenticationScheme)
        .TokenValidationParameters;
    }

    public static string HashPassword(string password)
    {
        byte[] inputBytes = Encoding.UTF8.GetBytes(password);
        byte[] inputHash = SHA256.HashData(inputBytes);
        return Encoding.UTF8.GetString(inputHash);
    }

    /*
    //Compara las contraseñas hasheadas
    public static bool ComparaPasswords(string hashedPassword, string incomingPassword)
    {
        return hashedPassword == HashPassword(incomingPassword);
    }
    */

    public async Task<string> LoginResult (LoginRequest model) {
        string? modelRole = await _unitOfWork.UserRepository.GetRoleByMailAsync(model.Mail);

        SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
        {
            //Se añaden los datos necesarios para autorizar al usuario
            Claims = new Dictionary<string, object?>
            {
                //Para definir el id, se usa el "ClaimTypes.NameIdentifier"
                { "id", Guid.NewGuid().ToString() },
                { ClaimTypes.Name, model.Mail },
                { ClaimTypes.Role, modelRole}
            },
            //Caducidad del token
            Expires = DateTime.UtcNow.AddDays(5),
            //Especificación de la clave y el algoritmo de firmado
            SigningCredentials = new SigningCredentials(
            _tokenParameters.IssuerSigningKey,
            SecurityAlgorithms.HmacSha256Signature)
        };

        //Se crea token y se devuelve al usuario logeado
        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
        string stringToken = tokenHandler.WriteToken(token);

        return stringToken;
    }
}

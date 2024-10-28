using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using System.Security.Cryptography;
using System.Text;

namespace eCommerce.Services
{
    public class AuthService
    {
        private readonly UnitOfWork _unitOfWork;

        public AuthService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
    }
}

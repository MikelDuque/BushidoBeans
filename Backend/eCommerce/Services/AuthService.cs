using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;

namespace eCommerce.Services
{
    public class AuthService
    {
        private readonly UnitOfWork _unitOfWork;

        public AuthService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Task<bool> ThisUserExist(string mail, string password)
        {
            return _unitOfWork.UserRepository.ThisUserExists(mail,password);
        }

        
    }
}

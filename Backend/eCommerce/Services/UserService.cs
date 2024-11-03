using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;

namespace eCommerce.Services;

public class UserService
{
  private readonly UnitOfWork _unitOfWork;

  public UserService(UnitOfWork unitOfWork)
  {
    _unitOfWork = unitOfWork;
  }

  public Task<ICollection<User>> GetAllAsync()
  {
    return _unitOfWork.UserRepository.GetAllAsync();
  }

  public Task<User> GetByIdAsync(long id)
  {
    return _unitOfWork.UserRepository.GetByIdAsync(id);
  }

  public Task<User> GetByMailAsync(string mail)
  {
    return _unitOfWork.UserRepository.GetByMailAsync(mail);
  }

  public async Task<User> InsertAsync(User user)
  {
    User newUser = new User
    {
      Mail = user.Mail,
      Password = user.Password,
      Name = user.Name,
      Surname = user.Surname,
      Phone = user.Phone,
      Admin = user.Admin
    };

    await _unitOfWork.UserRepository.InsertAsync(newUser);
    await _unitOfWork.SaveAsync();

    return newUser;
  }

  public async Task<User> UpdateAsync(long id, User user) {
    User userEntity = await _unitOfWork.UserRepository.GetByIdAsync(id);
    userEntity.Mail = user.Mail;
    userEntity.Name = user.Name;
    userEntity.Surname = user.Surname;
    userEntity.Phone = user.Phone;
    userEntity.Admin = user.Admin;

    return userEntity;
  }

  public async Task DeleteAsync(long id) {
    User user = await _unitOfWork.UserRepository.GetByIdAsync(id);
    _unitOfWork.UserRepository.Delete(user);

    await _unitOfWork.SaveAsync();
  }

  public Task<bool> ThisUserExist(string mail, string password)
  {
    string hashedPassword = AuthService.HashPassword(password);
    return _unitOfWork.UserRepository.ThisUserExists(mail, hashedPassword);
  }
}

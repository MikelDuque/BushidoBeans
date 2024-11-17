using System;
using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;

namespace eCommerce.Services;

public class UserService
{
  private readonly UnitOfWork _unitOfWork;
  private readonly UserMapper _mapper;

  public UserService(UnitOfWork unitOfWork, UserMapper mapper)
  {
    _unitOfWork = unitOfWork;
    _mapper = mapper;
  }

  //Obtención
  public async Task<IEnumerable<UserDto>> GetAllAsync()
  {
    IEnumerable<User> users = await _unitOfWork.UserRepository.GetAllAsync();
    return _mapper.ToDto(users);
  }

  public async Task<UserDto> GetByIdAsync(long id)
  {
    User user = await _unitOfWork.UserRepository.GetByIdAsync(id);
    return _mapper.ToDto(user);
  }

  //Inserción
  public async Task<User> InsertAsync(User user)
  {
    User newUser = new User
    {
      Mail = user.Mail,
      Password = user.Password,
      Name = user.Name,
      Image = user.Image,
      Surname = user.Surname,
      Phone = user.Phone,
      Role = user.Role
    };

    await _unitOfWork.UserRepository.InsertAsync(newUser);
    await _unitOfWork.SaveAsync();

    return newUser;
  }

  public async Task<UserDto> InsertByMailAsync(RegisterRequest userRequest)
  {
        User existingUser = await _unitOfWork.UserRepository.GetByMailAsync(userRequest.Mail);
        if (existingUser != null)
        {
            throw new Exception("El correo electronico ya esta registrado.");
        }
    User user = new User {
      Mail = userRequest.Mail,
      Password = AuthService.HashPassword(userRequest.Password),
      Name = userRequest.Name,
      Surname = "",
      Phone = 0,
      Role = null
    };

    User newUser = await InsertAsync(user);
    return _mapper.ToDto(newUser);
  }

  //Actualización
  public async Task<UserDto> UpdateAsync(long id, User user) {
    User userEntity = await _unitOfWork.UserRepository.GetByIdAsync(id);
    userEntity.Mail = user.Mail;
    userEntity.Name = user.Name;
    userEntity.Surname = user.Surname;
    userEntity.Phone = user.Phone;
    userEntity.Role = user.Role;

    return _mapper.ToDto(userEntity);
  }

  //Eliminación
  public async Task DeleteAsync(long id) {
    User user = await _unitOfWork.UserRepository.GetByIdAsync(id);
    await _unitOfWork.UserRepository.DeleteAsync(user);
    await _unitOfWork.SaveAsync();
  }

  //Otras Funcionalidades
  public Task<bool> ThisUserExists(string mail, string password)
  {
    string hashedPassword = AuthService.HashPassword(password);
    return _unitOfWork.UserRepository.ThisUserExists(mail, hashedPassword);
  }

  public Task<User> GetByMailAsync(string mail)
  {
    return _unitOfWork.UserRepository.GetByMailAsync(mail);
  }
}
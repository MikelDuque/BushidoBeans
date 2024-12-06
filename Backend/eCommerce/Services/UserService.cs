using System;
using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Enums;
using eCommerce.Models.Mappers;

namespace eCommerce.Services;

public class UserService
{
  private readonly UnitOfWork _unitOfWork;
  private readonly UserMapper _mapper;
  private readonly CartService _cartService;
  private readonly ReviewService _reviewService;
  private readonly OrderService _orderService;

  public UserService(UnitOfWork unitOfWork, UserMapper mapper, CartService cartService, ReviewService reviewService, OrderService orderService)
  {
    _unitOfWork = unitOfWork;
    _mapper = mapper;
    _cartService = cartService;
    _reviewService = reviewService;
    _orderService = orderService;
  }


  /* ----- GET ----- */

  public async Task<UserDto> GetByIdAsync(long id)
  {
    User user = await _unitOfWork.UserRepository.GetByIdAsync(id);
    return _mapper.ToDto(user);
  }

  public async Task<IEnumerable<UserDto>> GetAllAsync()
  {
    IEnumerable<User> users = await _unitOfWork.UserRepository.GetAllAsync();
    return _mapper.ToDto(users);
  }


  /* ----- INSERT ----- */

  public async Task<User> InsertAsync(User user)
  {
    await _unitOfWork.UserRepository.InsertAsync(user);
    await _unitOfWork.SaveAsync();

    return user;
  }

  public async Task<UserDto> InsertByMailAsync(RegisterRequest userRequest)
  {
        

       User user = new User {
      Mail = userRequest.Mail,
      Password = AuthService.HashPassword(userRequest.Password),
      Name = userRequest.Name,
      Addresses = _unitOfWork.UserRepository.GetByMailAsync(userRequest.Mail).Result.Addresses,
      //Address = userRequest.Address,
      Surname = userRequest.Surname,
      Phone = userRequest.Phone,
      Role = null
    };


    User newUser = await InsertAsync(user);
     
    return _mapper.ToDto(newUser);
  }


    /* ----- UPDATE ----- */

    public async Task<UserDto> UpdateAsync(User user)
    {
      User userEntity = await _unitOfWork.UserRepository.GetByIdAsync(user.Id) ?? throw new Exception("El usuario especificado no existe");

      userEntity = user;

      _unitOfWork.UserRepository.Update(userEntity);

      await _unitOfWork.UserRepository.SaveAsync();

      return _mapper.ToDto(userEntity);
    }

    public async Task<UserDto> UpdateRole(HandleRole handleRole)
    {
        User userEntity = await _unitOfWork.UserRepository.GetByIdAsync(handleRole.UserId) ?? throw new Exception("El usuario no existe");
        userEntity.Role = handleRole.Role;

        _unitOfWork.UserRepository.Update(userEntity);

        await _unitOfWork.UserRepository.SaveAsync();

        return _mapper.ToDto(userEntity);
    }


  /* ----- DELETE ----- */

  public async Task<bool> DeleteAsyncUserById(long id) {
    User user = await _unitOfWork.UserRepository.GetByIdAsync(id);
    _unitOfWork.UserRepository.Delete(user);

/*
    foreach (Order order in user.Orders.ToList())
    {
      await _orderService.DeleteOrderByIdAsync(order.Id);
    }
*/
    return await _unitOfWork.SaveAsync();
  }


  /* ----- FUNCIONES PRIVADAS ----- */
  
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
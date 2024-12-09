using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class UserMapper
{
    private readonly OrderMapper _orderMapper;
    private readonly AddressMapper _addressMapper;

    public UserMapper(OrderMapper orderMapper, AddressMapper addressMapper)
  {
    _orderMapper = orderMapper;
    _addressMapper = addressMapper;
  }

    //TO DTO
    public UserDto ToDto(User user)
    {
        return new UserDto()
        {
            Id = user.Id,
            Mail = user.Mail,
            Name = user.Name,
            Surname = user.Surname,
            Phone = user.Phone,
            Role = user.Role,
            Addresses = _addressMapper.ToDto(user.Addresses).ToList(),
            Orders = _orderMapper.ToDto(user.Orders).ToList()
        };
    }

    public IEnumerable<UserDto> ToDto(IEnumerable<User> users)
    {
        return users.Select(ToDto);
    }

    
    //TO ENTITY
    public User ToEntity(UserDto user)
    {
        return new User
        {
            Id = user.Id,
            Mail = user.Mail,
            Name = user.Name,
            Surname = user.Surname,
            Phone = user.Phone,
            Role = user.Role
        };
    }

    public IEnumerable<User> ToEntity(IEnumerable<UserDto> users)
    {
        return users.Select(ToEntity);
    }
    
}

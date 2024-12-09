using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;
public class AddressMapper
{
    //TO DTO
    public AddressDto ToDto(Address address)
    {
        return new AddressDto
        {
            Id = address.Id,
            Addressee = address.Addressee,
            PhoneNumber = address.PhoneNumber,
            AddressInfo = address.AddressInfo,
            UserId = address.UserId
        };

    }

    public IEnumerable<AddressDto> ToDto(IEnumerable<Address> addresses)
    {
        return addresses.Select(ToDto);
    }


    //TO ENTITY
    public Address ToEntity(AddressDto address)
    {
        return new Address
        {
            Addressee = address.Addressee,
            PhoneNumber = address.PhoneNumber,
            AddressInfo = address.AddressInfo,
            UserId = address.UserId
        };

    }

    public IEnumerable<Address> ToEntity(IEnumerable<AddressDto> addresses)
    {
        return addresses.Select(ToEntity);
    }
}

using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers
{
    public class AddressMapper
    {
        public AddressDto ToDto(Address address)
        {
            return new AddressDto
            {
                Addressee = address.Addressee,
                PhoneNumber = address.PhoneNumber,
                NameAddress = address.NameAddress,
                UserId = address.Id
            };
        }
    }
}

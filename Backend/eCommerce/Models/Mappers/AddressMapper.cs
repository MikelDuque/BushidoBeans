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
                Id = address.Id,
                Addressee = address.Addressee,
                PhoneNumber = address.PhoneNumber,
                AddressInfo = address.AddressInfo,
                UserId = address.UserId
            };
        }
    }
}

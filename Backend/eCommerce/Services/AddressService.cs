using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;

namespace eCommerce.Services
{
    public class AddressService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly AddressMapper _mapper;

        public AddressService(UnitOfWork unitOfWork, AddressMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // Obtener dirección por ID
        public async Task<AddressDto> GetByIdAsync(long id)
        {
            Address address = await _unitOfWork.AddressRepository.GetByIdAsync(id);
            return _mapper.ToDto(address);
        }

        // Crear nueva dirección
        public async Task<bool> CreateAddressAsync(AddressDto addressDto)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(addressDto.UserId);
            if (user == null)
            {
                return false;  
            }

            var address = new Address
            {
                Addressee = addressDto.Addressee,
                PhoneNumber = addressDto.PhoneNumber,
                AddressInfo = addressDto.AddressInfo,
                UserId = addressDto.UserId,
                User = user 
            };

            await _unitOfWork.AddressRepository.InsertAsync(address);

            return await _unitOfWork.SaveAsync();
        }
    }
}

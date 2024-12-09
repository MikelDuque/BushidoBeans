using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;
using Microsoft.EntityFrameworkCore;

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
            User user = await _unitOfWork.UserRepository.GetByIdAsync(addressDto.UserId);

            if (user == null)
            {
                return false;  
            }

            Address newAdress = new Address
            {

                Addressee = addressDto.Addressee,
                PhoneNumber = addressDto.PhoneNumber,
                AddressInfo = addressDto.AddressInfo,
                UserId = addressDto.UserId,
                
            };

            await _unitOfWork.AddressRepository.InsertAsync(newAdress);

            return await _unitOfWork.SaveAsync();
        }

        public async Task<IEnumerable<AddressDto>> GetAllByUserIdAsync(long userId)
        {
            var addresses = await _unitOfWork.AddressRepository
                .GetQueryable()
                .Where(a => a.UserId == userId)
                .ToListAsync();

            return _mapper.ToDto(addresses);
        }
        public async Task<bool> DeleteAddressAsync(long id)
        {
            Address address = await _unitOfWork.AddressRepository.GetByIdAsync(id);

            if (address == null)
            {
                return false; 
            }

            _unitOfWork.AddressRepository.Delete(address);

            return await _unitOfWork.SaveAsync();
        }



    }
}

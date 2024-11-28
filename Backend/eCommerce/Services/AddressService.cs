using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;

namespace eCommerce.Services;

public class AddressService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly AddressMapper _mapper;

    public AddressService(UnitOfWork unitOfWork, AddressMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<AddressDto> GetByIdAsync(long id)
    {
        Address address = await _unitOfWork.AddressRepository.GetByIdAsync(id);
        return _mapper.ToDto(address);
    }

    public async Task<bool> CreateAddressAsync(Address address)
    {
        await _unitOfWork.AddressRepository.InsertAsync(address);

        return await _unitOfWork.SaveAsync();
    }
}


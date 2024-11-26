using eCommerce.Controllers;

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

    public async Task<Address> CreateAddressAsync(Address address)
    {
        await _unitOfWork.AddressRepository.InsertAsync(address);

        return await _unitOfWork.SaveAsync();
    }
}


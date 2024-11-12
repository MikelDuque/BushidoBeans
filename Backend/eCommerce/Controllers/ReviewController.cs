using eCommerce.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.Controllers;

[Route("api/[controller]")]
public class ReviewController : ControllerBase
{
    private readonly ReviewService _service;

    public ReviewController(ReviewService service)
    {
        _service = service;
    }


    [HttpGet("{id}")]
    public async Task<ProductDto> GetByIdAsync(long id)
    {
        return await _service.GetByIdAsync(id);
    }
}
using eCommerce.Models.Dtos;
using eCommerce.Models.Database.Entities;
using eCommerce.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace eCommerce.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewController : ControllerBase
{
    private readonly ReviewService _service;

    public ReviewController(ReviewService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<ReviewDto> GetByIdAsync(long id)
    {
        return await _service.GetByIdAsync(id);
    }


    [Authorize]
    [HttpPost("InsertReview")]
    public async Task<ActionResult<Review>> CreateReviewAsync([FromBody] Review review)
    {

        

        if (review == null) return BadRequest("Datos de la rese�a no v�lidos.");

        return await _service.CreateReviewAsync(review);
    }
}
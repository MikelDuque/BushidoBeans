using eCommerce.Models.Dtos;
using eCommerce.Models.Database.Entities;
using eCommerce.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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

    [HttpGet]   //PARA PRUEBAS (BORRAR)
    public async Task<IEnumerable<Review>> GetAllAsync()
    {
        return await _service.GetAllAsync();
    }

    [HttpGet("{id}")]
    public async Task<ReviewDto> GetByIdAsync(long id)
    {
        return await _service.GetByIdAsync(id);
    }

    [Authorize]
    [HttpPost("Insert_Review")]
    public async Task<ActionResult<Review>> CreateReviewAsync([FromBody] Review review)
    {
        Claim userClaimId = User.FindFirst("id");

        if (userClaimId == null) return Unauthorized("Debes iniciar sesión para llevar a cabo esta acción");

        if (review == null) return BadRequest("Datos de la reseña no válidos.");

        return await _service.CreateReviewAsync(review);
    }
}
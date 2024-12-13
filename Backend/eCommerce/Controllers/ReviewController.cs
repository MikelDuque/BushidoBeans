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
    public async Task<ActionResult> GetByIdAsync(long id)
    {
        if (id <= 0) return BadRequest(new {Message= "El ID del usuario es inválido."});
        return Ok(await _service.GetByIdAsync(id));
    }

    [Authorize]
    [HttpPost("Insert_Review")]
    public async Task<ActionResult> CreateReviewAsync([FromBody] ReviewDto review)
    {
        Claim userClaimId = User.FindFirst("id");
        if (userClaimId == null) return Unauthorized(new {message = "Debes iniciar sesión para llevar a cabo esta acción"});

        if (review == null) return BadRequest(new {message= "Datos de la reseña inválidos."});
        return Ok(await _service.CreateReviewAsync(review));
    }
}
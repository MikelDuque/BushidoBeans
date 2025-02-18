﻿using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace eCommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> GetOrderByIdAsync(long id)
        {
            Claim userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized(new {Message = "Debes iniciar sesión para llevar a cabo esta acción"});

            if (id <= 0) return BadRequest(new {Message= "El ID del pedido es inválido."});
            return Ok(await _orderService.GetOrderByIdAsync(id));
        }
        
        [HttpPost("Insert_Order")]
        public async Task<ActionResult> InsertOrder([FromBody]OrderDto order)
        {
            Claim userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized(new {Message = "Debes iniciar sesión para llevar a cabo esta acción"});

            if (order == null) return BadRequest(new {message = "El pedido a introducir es Incorrecto" });
            return Ok(await _orderService.InsertOrderAsync(order));
        }

        [HttpGet("Get_User_Orders/{id}")]
        public async Task<ActionResult> GetOrdersByUserIdAsync(long id)
        {
            Claim userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized(new { Message = "Debes iniciar sesión para llevar a cabo esta acción" });

            if (id <= 0) return BadRequest(new {Message= "El ID introducido es inválido."});
            return Ok(await _orderService.GetOrdersByUserIdAsync(id));
        }

    }
}

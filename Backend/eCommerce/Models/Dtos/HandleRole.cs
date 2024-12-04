using System;
namespace eCommerce.Models.Dtos
{
    public class HandleRole
    {
        public required long UserId { get; set; }
        public required string Role { get; set; }
    }
}

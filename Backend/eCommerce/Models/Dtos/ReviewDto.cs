using eCommerce.Models.Enums;

namespace eCommerce.Models.Dtos;

public class ReviewDto
{
    public required long Id { get; set; }
    public required EScore Score { get; set; } //puede ser byte, int o enum, preguntar a Mik
    public string Body { get; set; }
    public long ProductId { get; set; }
    public long UserId { get; set; }
}
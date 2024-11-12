using eCommerce.Models.Enums;

namespace eCommerce.Models.Dtos;

public class ReviewDto
{
    public required long Id { get; set; }
    public required EScore Score { get; set; }
    public string Body { get; set; }
    public long ProductId { get; set; }
    public string UserName { get; set; }
    public DateTime Datetime { get; set; }
}
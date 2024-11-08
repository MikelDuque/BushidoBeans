using System.ComponentModel.DataAnnotations.Schema;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Database.Entities;

public class Review
{
    public long Id { get; set; }
    public required EScore Score { get; set; }
    public string Body { get; set; }

    //---Foreign Keys---//

    [ForeignKey(nameof(Product))]
    public long ProductId { get; set; }
    public Product Product { get; set; }

    [ForeignKey(nameof(User))]
    public long UserId { get; set; }
    public User User { get; set; }
}
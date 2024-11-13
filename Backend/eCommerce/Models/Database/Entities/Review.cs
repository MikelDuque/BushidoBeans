using System.ComponentModel.DataAnnotations.Schema;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Database.Entities;

public class Review
{
    public long Id { get; set; }
    public required EScore Score { get; set; }
    public string Body { get; set; }
    public required DateTime PubliDate { get; set; }


    //---Foreign Keys---//

    [ForeignKey(nameof(Product))]
    public required long ProductId { get; set; }
    public Product Product { get; set; }

    [ForeignKey(nameof(User))]
    public required long UserId { get; set; }
    public User User { get; set; }
}
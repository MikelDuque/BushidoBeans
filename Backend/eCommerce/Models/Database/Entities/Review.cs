using System.ComponentModel.DataAnnotations.Schema;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Database.Entities;

public class Review
{
    public long Id { get; set; }
    public required EScore Score { get; set; }
    public string Body { get; set; }
    public DateTime PubliDate { get; set; }


    /* RELACIONES 1-M */
    [ForeignKey(nameof(Product))]
    public required long ProductId { get; set; }
    public Product Product { get; set; }

    [ForeignKey(nameof(User))]
    public required long UserId { get; set; }
    public User User { get; set; }
}
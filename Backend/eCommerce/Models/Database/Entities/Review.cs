using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.Models.Database.Entities;

[PrimaryKey(nameof(ID))]
public class Review
{
    public long ID { get; set; }
    public string Body { get; set; }
    public byte Score { get; set; } //puede ser byte, int o enum, preguntar a Mik


    //---Foreign Keys---//
    public long ProductId { get; set; }

    [ForeignKey(nameof(ProductId))]
    public Product Product { get; set; } = null!;


    public long UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public User User { get; set; } = null!;
}
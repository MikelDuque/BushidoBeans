using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.Models.Database.Entities;

public class Review
{
    public long Id { get; set; }
    public required byte Score { get; set; } //puede ser byte, int o enum, preguntar a Mik
    public string? Body { get; set; }

    //---Foreign Keys---//
    public long ProductId { get; set; }
    //[ForeignKey(nameof(ProductId))]
    public Product Product { get; set; } = null!;

    public long UserId { get; set; }
    //[ForeignKey(nameof(UserId))]
    public User User { get; set; } = null!;
}
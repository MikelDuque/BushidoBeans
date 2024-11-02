using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.Models.Database.Entities;

[Owned]
[PrimaryKey(nameof(UserId))]

public class Cart
{
    [ForeignKey("UserId")]
    public long UserId { get; set; }
    //public User User { get; set; }
    public ICollection<Cart_Product> Cart_Products { get; set; }
}
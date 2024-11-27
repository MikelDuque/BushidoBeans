using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.Models.Database.Entities;

public class Address
{
    public long Id { get; set; }
    public string Addressee { get; set; }
    public long PhoneNumber { get; set; }
    public string NameAddress { get; set; }

    [ForeignKey(nameof(User))]
    public User User { get; set; }
    public long UserId { get; set; }
}

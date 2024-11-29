using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.Models.Database.Entities;

public class Address
{
    public long Id { get; set; }
    public string Addressee { get; set; }
    public long PhoneNumber { get; set; }
    public string AddressInfo { get; set; }

    /* RELACIONES 1-M */
    [ForeignKey(nameof(User))]
    public long UserId { get; set; }
    public User User { get; set; }

    [ForeignKey(nameof(Order))]
    public long OrderId { get; set; }
    public Order Order { get; set; }
}

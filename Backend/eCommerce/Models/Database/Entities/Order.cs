using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace eCommerce.Models.Database.Entities;

public class Order
{
  public long Id { get; set; }
  public decimal TotalPrice { get; set; }
  public int TotalProducts { get; set; }
  public DateTime PurchaseDate { get; set; }


  /* RELACIONES 1-M */
  [ForeignKey(nameof(User))]
  public long UserId { get; set; }
  public User User { get; set; }

  [ForeignKey(nameof(Address))]
  public long AddressId { get; set; }
  public Address Address { get; set; }

    /* RELACIONES M-N */
  public List<OrderProduct> OrderProducts { get; set; } = [];
  public List<Product> Products { get; set; } = [];
}

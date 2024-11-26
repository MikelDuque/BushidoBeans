using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.Models.Database.Entities;

public class Order
{
  public long Id { get; set; }
  public decimal TotalPrice { get; set; }
  public int TotalProducts { get; set; }
  public DateTime PurchaseDate { get; set; }


  //---Foreign Keys---//

  
  [ForeignKey(nameof(User))]
  public long UserId { get; set; }
  public User User { get; set; }
  public List<CartProduct> CartProducts { get; } = [];
  
  /*
  [ForeignKey(nameof(Cart))]
  public long CartId { get; set; }
  public Cart Cart { get; set; }
  */

  public List<Product> Products { get; } = [];
  
  /*
  [ForeignKey(nameof(Adress))]
  public long AdressId { get; set; }
  public User Adress { get; set; }
  */
}

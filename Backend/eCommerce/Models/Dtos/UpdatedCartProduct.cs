namespace eCommerce.Models.Dtos;

public class UpdatedCartProduct
{
  public long UserId { get; set; }
  public long ProductId { get; set; }
  public int Quantity { get; set; }
}

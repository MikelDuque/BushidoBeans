namespace eCommerce.Models.Dtos;

public class OrderDto
{
  public long Id { get; set; }
  public decimal TotalPrice { get; set; }
  public int TotalProducts { get; set; }
  public DateTime PurchaseDate { get; set; }
  public List<OrderProductDto> OrderProducts { get; set; }

  public long UserId { get; set; }
}

namespace eCommerce.Models.Dtos;

public class OrderProductDto
{
 public long OrderId { get; set; }
 public long ProductId { get; set; }
 public string Image { get; set; }
 public string Name { get; set; }
 public decimal PurchasePrice { get; set; }
 public required int Quantity {  get; set; } 
}

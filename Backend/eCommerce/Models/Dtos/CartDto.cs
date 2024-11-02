namespace eCommerce.Models.Dtos;

public class CartDto
{
    public long UserID { get; set; }
    public long ProductID { get; set; }
    public int Quantity { get; set; }
}


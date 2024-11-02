namespace eCommerce.Models.Database.Entities;

public class Cart
{
    public long UserId { get; set; }
    public User User { get; set; }

    public long ProductId { get; set; }
    public Product Product { get; set; }

    public int Quantity { get; set; }
}

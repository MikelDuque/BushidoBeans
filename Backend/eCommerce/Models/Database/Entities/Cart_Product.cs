namespace eCommerce.Models.Database.Entities;

public class Cart_Product
{
    public long CartId { get; set; }
    public Cart Cart { get; set; }

    public long ProductId { get; set; }
    public Product Product { get; set; }

    public int Quantity { get; set; }
}

namespace eCommerce.Models.Dtos;

public class Cart
{
   public long Id { get; set; }
   public List<UpdatedCartProduct> CartProducts { get; set; }
   
}

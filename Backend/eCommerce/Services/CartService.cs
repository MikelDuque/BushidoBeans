using eCommerce.Controllers;

namespace eCommerce.Services;

public class CartService
{
   private readonly UnitOfWork _unitOfWork;

   public CartService(UnitOfWork unitOfWork)
   {
       _unitOfWork = unitOfWork;
   }
}

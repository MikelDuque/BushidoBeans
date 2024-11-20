using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.Models.Database.Entities;

[PrimaryKey(nameof(ProductId), nameof(CartId))]
public class CartProduct
{
   public long CartId { get; set; }
   public long ProductId { get; set; }

    [ForeignKey(nameof(CartId))]
    public Cart Cart { get; set; } = null!;

    [ForeignKey(nameof(ProductId))]
    public Product Product { get; set; } = null!;

   public required int Quantity { get; set; }
}
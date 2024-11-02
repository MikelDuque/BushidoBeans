using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[PrimaryKey(nameof(ID))]
public class Review
{
    public long ID { get; set; }
    public string Body { get; set; }
    public byte Score { get; set; } //puede ser byte, int o enum, preguntar a Mik


    //---Foreign Keys---//
    public long ProductId { get; set; }
    public Product Product { get; set; } //Esto es para que Review pueda acceder a los datos de Product, no entiendo del todo por qué se hace así, imagino que para que pueda coger la id de Product.

    public long UserId { get; set; }
    public User User { get; set; }
}
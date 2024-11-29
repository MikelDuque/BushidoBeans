namespace eCommerce.Models.Dtos
{
    public class AddressDto
    {
        public long Id { get; set; }
        public string Addressee { get; set; }
        public long PhoneNumber { get; set; }
        public string AddressInfo { get; set; }
        public long UserId { get; set; }
    }
}

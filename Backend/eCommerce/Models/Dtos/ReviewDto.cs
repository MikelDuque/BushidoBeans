namespace eCommerce.Models.Dtos
{
    public class ReviewDto
    {
        public long Id { get; set; }
        public string Body { get; set; }
        public byte Score { get; set; } //puede ser byte, int o enum, preguntar a Mik
        public long ProductID { get; set; }
    }
}
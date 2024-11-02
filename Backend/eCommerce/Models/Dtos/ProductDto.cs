namespace eCommerce.Models.Dtos
{
    public class ProductDto
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string NutritionalInfo { get; set; }
        public byte Intensity { get; set; } //puede ser byte, int o enum, preguntar a Mik
        public decimal Price { get; set; }
        public int Discount { get; set; }
        public int Quantity { get; set; }
        public decimal Score { get; set; }
        public List<ReviewDto> Reviews { get; set; }
    }
}
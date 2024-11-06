using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Mappers;

public class ProductMapper
{
    //TO DTO
    public ProductDto ToDto(Product product)
    {
        return new ProductDto()
        {
            Id = product.Id,
            Image = product.Image,
            Name = product.Name,
            Description = product.Description,
            Category = (ECategory)product.CategoryId,
            Intensity = product.Intensity,
            Price = product.Price,
            Stock = product.Stock,
            TotalReviews = product.Reviews.Count,
            Score = product.Reviews.Select(review => (int)review.Score).Average()
        };
    }
    public IEnumerable<ProductDto> ToDto(IEnumerable<Product> products)
    {
        return products.Select(ToDto);
    }
}

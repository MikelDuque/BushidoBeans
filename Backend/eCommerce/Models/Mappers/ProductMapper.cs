using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Mappers;

public class ProductMapper
{
    private readonly ReviewMapper _reviewMapper;

    public ProductMapper(ReviewMapper reviewMapper)
    {
        _reviewMapper = reviewMapper;
    }

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
            Score = Score(product),
            Reviews = GetReviews(product).ToList()
        };
    }
    public IEnumerable<ProductDto> ToDto(IEnumerable<Product> products)
    {
        return products.Select(ToDto);
    }

    //TO ENTITY
    public Product ToEntity(ProductDto product)
    {
        return new Product()
        {
            Image = product.Image,
            Name = product.Name,
            Description = product.Description,
            CategoryId = (long)product.Category,
            Intensity = product.Intensity,
            Price = product.Price,
            Stock = product.Stock
        };
    }
    public IEnumerable<Product> ToEntity(IEnumerable<ProductDto> products)
    {
        return products.Select(ToEntity);
    }


    /* ----- FUNCIONES PRIVADAS ----- */
    private double Score(Product product) {
        double score = 0;

        int TotalReviews = product.Reviews.Count;

        return TotalReviews > 0? product.Reviews.Select(review => (int)review.Score).Average() : score;
    }

    private IEnumerable<ReviewDto> GetReviews(Product product) {
       IEnumerable<Review> reviews = product.Reviews;

       IEnumerable<ReviewDto> reviewsDto = _reviewMapper.ToDto(reviews);

       return reviewsDto;
    }
}

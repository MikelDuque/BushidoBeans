using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class ReviewMapper
{
    //TO DTO
    public ReviewDto ToDto(Review review)
    {
        return new ReviewDto
        {
            Id = review.Id,
            Score = review.Score,
            Body = review.Body,
            UserName = review.UserName,
            PubliDate = review.PubliDate,
        };
    }
    public IEnumerable<ReviewDto> ToDto(IEnumerable<Review> reviews)
    {
        return reviews.Select(ToDto);
    }

    //TO ENTITY
    public Review ToEntity(ReviewDto review)
    {
        return new Review
        {
            Id = review.Id,
            Score = review.Score,
            Body = review.Body,
            ProductId = review.ProductId,
            UserId = review.UserId,
            PubliDate = review.PubliDate,
        };
    }
    public IEnumerable<Review> ToEntity(IEnumerable<ReviewDto> reviews)
    {
        return reviews.Select(ToEntity);
    }
}

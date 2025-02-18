using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Mappers;

public class ReviewMapper
{
    //TO DTO
    public ReviewDto ToDto(Review review)
    {
        return new ReviewDto
        {
            Id = review.Id,
            Score = (int)review.Score,
            Body = review.Body,
            PubliDate = review.PubliDate,
            
            ProductId = review.ProductId,
            UserId = review.UserId,
            UserName = $"{review.User.Name} {review.User.Surname}"
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
            Score = (EScore)review.Score,
            Body = review.Body,
            PubliDate = review.PubliDate,
            ProductId = review.ProductId,
            UserId = review.UserId 
        };
    }
    public IEnumerable<Review> ToEntity(IEnumerable<ReviewDto> reviews)
    {
        return reviews.Select(ToEntity);
    }
}

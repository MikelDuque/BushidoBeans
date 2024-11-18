using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class ReviewMapper
{
    //TO DTO
    public ReviewDto ToDto(Review review)
    {
            Id = review.Id,
            Score = review.Score,
            Body = review.Body,
            PubliDate = review.PubliDate,
            
            ProductId = review.ProductId,
            UserId = review.UserId,
            UserName = review.User.Name
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
            Score = review.Score,
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

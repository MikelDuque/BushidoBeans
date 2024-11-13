using System;
using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Mappers;

namespace eCommerce.Services;

public class ReviewService
{
  private readonly UnitOfWork _unitOfWork;
  private readonly ProductMapper _mapper;

  public ReviewService(UnitOfWork unitOfWork, ProductMapper mapper)
  {
      _unitOfWork = unitOfWork;
      _mapper = mapper;
  }

  public async Task<Review> InsertAsync(Review review)
  {
    Review newReview = new Review
    {
      Score = review.Score,
      Body = review.Body,
      ProductId = review.ProductId,
      UserId = review.UserId
    };

    await _unitOfWork.ReviewRepository.InsertAsync(newReview);
    await _unitOfWork.SaveAsync();

    return newReview;
  }
}

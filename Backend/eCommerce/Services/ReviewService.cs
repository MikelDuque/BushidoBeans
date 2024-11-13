using System;
using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;

namespace eCommerce.Services;

public class ReviewService
{
  private readonly UnitOfWork _unitOfWork;
  private readonly ReviewMapper _mapper;

  public ReviewService(UnitOfWork unitOfWork, ReviewMapper mapper)
  {
      _unitOfWork = unitOfWork;
      _mapper = mapper;
  }

  public async Task<ReviewDto> GetByIdAsync(long id)
  {
    Review review = await _unitOfWork.ReviewRepository.GetByIdAsync(id);
    return _mapper.ToDto(review);
  }

  public async Task<Review> InsertAsync(Review review)
  {
    Review newReview = new Review
    {
      Score = review.Score,
      Body = review.Body,
      PubliDate = DateTime.Now,
      ProductId = review.ProductId,
      UserId = review.UserId
    };

    await _unitOfWork.ReviewRepository.InsertAsync(newReview);
    await _unitOfWork.SaveAsync();

    return newReview;
  }
}

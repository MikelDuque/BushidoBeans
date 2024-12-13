using System;
using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Enums;
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

  public async Task<IEnumerable<Review>> GetAllAsync()
  {
    IEnumerable<Review> reviews = await _unitOfWork.ReviewRepository.GetAllAsync();
    return reviews;
  }

  public async Task<ReviewDto> GetByIdAsync(long id)
  {
    Review review = await _unitOfWork.ReviewRepository.GetByIdAsync(id);
    return _mapper.ToDto(review);
  }

  public async Task<ReviewDto> CreateReviewAsync(ReviewDto review)
  {

    Review newReview = new Review
    {
      Score = (EScore)review.Score,
      Body = review.Body,
      PubliDate = DateTime.Now,
      ProductId = review.ProductId,
      UserId = review.UserId
    };

    Review postedReview = await _unitOfWork.ReviewRepository.InsertAsync(newReview);
    await _unitOfWork.SaveAsync();

    return await GetByIdAsync(postedReview.Id);
  }

  public async Task<bool> DeleteReviewAsync(Review review)
  {
    _unitOfWork.ReviewRepository.Delete(review);

    return await _unitOfWork.SaveAsync();
  }

  public async Task<bool> DeleteReviewsAsync(object id)
  {
    User user = await _unitOfWork.UserRepository.GetUserDataByIdAsync(id);
    bool isDeleted = false;

    foreach (Review review in user.Reviews.ToList())
    {
      await DeleteReviewAsync(review);
    }

    return isDeleted;
  }
}

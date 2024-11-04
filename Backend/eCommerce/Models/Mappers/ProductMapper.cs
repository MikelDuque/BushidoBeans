using System;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class ProductMapper
{
  //TO DTO
  public ProductDto ToDto(Product product) {
    return new ProductDto() {
      Id = product.Id,
      Name = product.Name,
      Description = product.Description,
      NutritionalInfo = product.NutritionalInfo,
      Intensity = product.Intensity,
      Price = product.Price,
      Discount = product.Discount,
      Stock = product.Stock,
      Score = product.Score,
      Reviews = product.Reviews.Select(review => new ReviewDto
      {
        Id = review.Id,
        Score = review.Score,
        Body = review.Body,
        UserId = review.UserId
      })
      .ToList()
    };
  }
  public IEnumerable<ProductDto> ToDto(IEnumerable<Product> products) {
    return products.Select(ToDto);
  }

  //TO ENTITY
  public Product ToEntity(ProductDto product) {
    return new Product() {
      Id = product.Id,
      Name = product.Name,
      Description = product.Description,
      NutritionalInfo = product.NutritionalInfo,
      Intensity = product.Intensity,
      Price = product.Price,
      Discount = product.Discount,
      Stock = product.Stock,
      Score = product.Score
    };
  }
  public IEnumerable<Product> ToEntity(IEnumerable<ProductDto> products) {
    return products.Select(ToEntity);
  }
}

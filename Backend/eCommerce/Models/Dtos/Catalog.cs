using System;

namespace eCommerce.Models.Dtos;

public class Catalog
{
  public int TotalPages { get; set; }
  public List<ProductDto> FilteredProducts { get; set; }
}

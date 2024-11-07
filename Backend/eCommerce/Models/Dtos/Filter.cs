using System;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Dtos;

public class Filter
{
  public required string search;
  public required ECategory category;
  public required EOrder order;
  public required bool thereStock;
  public required int productsPerPage;
  public required int currentPage;
}

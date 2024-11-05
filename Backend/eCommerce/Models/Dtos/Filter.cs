using System;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Dtos;

public class Filter
{
  public required string search;
  public required Categories categories;
  public required Order order;
  public required bool thereStock;
  public required int productsPerPage;
  public required int page;
}

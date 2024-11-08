using System;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Dtos;

public class Filter
{
  public string Search { get; set; }
  public ECategory category = ECategory.Coffee;
  public EOrder order = EOrder.ABC_Desc;
  public bool thereStock = true;
  public int productsPerPage = 5;
  public int currentPage = 1;
}

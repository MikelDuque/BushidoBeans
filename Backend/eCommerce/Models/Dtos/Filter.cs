using System;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Dtos;

public class Filter
{
    public string Search { get; set; }
    public int Category { get; set; }
    public int Order { get; set; }
    public bool IncludeStockless { get; set; }
    public int ProductsPerPage { get; set; }
    public int CurrentPage { get; set; }
}

using System;
using eCommerce.Models.Enums;

namespace eCommerce.Models.Dtos;

public class Filter
{
    public string Search { get; set; }
    public ECategory Category { get; set; }
    public EOrder Order { get; set; }
    public bool ThereStock { get; set; }
    public int ProductsPerPage { get; set; }
    public int CurrentPage { get; set; }
}

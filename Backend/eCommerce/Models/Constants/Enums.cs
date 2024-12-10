namespace eCommerce.Models.Enums;
public enum EIntensity
{
    No,
    Soft,
    Medium,
    Strong,
}

public enum ECategory : long
{
    All,
    Coffee,
    Tea,
    Others
}

public enum EScore
{
    No,
    Negative,
    Regular,
    Positive
}

public enum EOrder
{
    ABC_Asc,
    ABC_Desc,
    Price_Asc,
    Price_Desc
}
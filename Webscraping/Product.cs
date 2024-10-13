using System.Text;

public class Product {
    public string Name { get; init; }
    public decimal Price { get; init; }
    public Product(string name, decimal price) {
        Name = name;
        Price = price;
    }

    public override string ToString() {
        StringBuilder sb = new StringBuilder();

        sb.AppendLine($"Name: {Name}");
        sb.AppendLine($"Price: {Price} €");
        
        return sb.ToString();
    }
}
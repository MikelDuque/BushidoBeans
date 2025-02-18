using System;
using System.Diagnostics;
using System.Globalization;
using System.Text;
using eCommerce.Models.Database.Entities;
using F23.StringSimilarity;
using F23.StringSimilarity.Interfaces;

namespace eCommerce.Services;

public class TextComparer
{
  private const double THRESHOLD = 0.80;

  private readonly INormalizedStringSimilarity _stringSimilarityComparer;

  public TextComparer()
  {
    _stringSimilarityComparer = new JaroWinkler();
  }

  public IEnumerable<Product> SearchFilter(IQueryable<Product> query, string search)
  {
    Debug.WriteLine(search);
    List<Product> listaFiltrada = [];

    if (!string.IsNullOrWhiteSpace(search))
    {
      // Limpiamos la búsqueda y la separamos por espacios
      string[] searchTokens = GetTokens(ClearText(search));

      foreach (Product product in query)
      {
        // Limpiamos el item y lo separamos por espacios
        string[] productNameTokens = GetTokens(ClearText(product.Name));

        // Si coincide alguna de las palabras de item con las de query, entonces añadimos item a la lista de coincidencias
        if (IsMatch(searchTokens, productNameTokens))
        {
          listaFiltrada.Add(product);
        }
      }

      return listaFiltrada;
    }
    return query.ToList();
  }

  private bool IsMatch(string[] queryKeys, string[] itemKeys)
  {
      bool isMatch = false;

      for (int i = 0; !isMatch && i < itemKeys.Length; i++)
      {
          string itemKey = itemKeys[i];

          for (int j = 0; !isMatch && j < queryKeys.Length; j++)
          {
              string queryKey = queryKeys[j];

              isMatch = IsMatch(itemKey, queryKey);
          }
      }

      return isMatch;
  }

  // Hay coincidencia si las palabras son las mismas o si item contiene query o si son similares
  private bool IsMatch(string itemKey, string queryKey)
  {
      return itemKey == queryKey
          || itemKey.Contains(queryKey)
          || _stringSimilarityComparer.Similarity(itemKey, queryKey) >= THRESHOLD;
  }

  // Separa las palabras quitando los espacios y 
  private string[] GetTokens(string query)
  {
      return query.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
  }

  // Normaliza el texto quitándole las tildes y pasándolo a minúsculas
  private string ClearText(string text)
  {
      return RemoveDiacritics(text.ToLower());
  }

  // Quita las tildes a un texto
  private string RemoveDiacritics(string text)
  {
      string normalizedString = text.Normalize(NormalizationForm.FormD);
      StringBuilder stringBuilder = new StringBuilder(normalizedString.Length);

      for (int i = 0; i < normalizedString.Length; i++)
      {
          char c = normalizedString[i];
          UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
          if (unicodeCategory != UnicodeCategory.NonSpacingMark)
          {
              stringBuilder.Append(c);
          }
      }

      return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
  }

    public static implicit operator TextComparer(JaroWinkler v)
    {
        throw new NotImplementedException();
    }
}

/*
using System;
using System.Globalization;
using System.Text;
using eCommerce.Models.Database.Entities;
using F23.StringSimilarity;
using F23.StringSimilarity.Interfaces;

namespace eCommerce.Services;

public class TextComparer2
{
  private const double THRESHOLD = 0.75;

  private readonly INormalizedStringSimilarity _stringSimilarityComparer;

  public TextComparer2()
  {
    _stringSimilarityComparer = new JaroWinkler();
  }

public IQueryable<Product> SearchFilter(IQueryable<Product> query, string search)
  {

      // Si la consulta está vacía o solo tiene espacios en blanco, devolvemos todos los items
      if (!string.IsNullOrWhiteSpace(search))
      {
        // Limpiamos la query y la separamos por espacios
          string[] searchTokens = GetTokens(ClearText(search));

        return query.AsEnumerable().Where(product => {
            // Limpiamos el item y lo separamos por espacios
            string[] productNameTokens = GetTokens(ClearText(product.Name));

            // Si coincide alguna de las palabras de item con las de query
            // entonces añadimos item a la lista de coincidencias
            IsMatch(searchTokens, productNameTokens);
        });
      }
    return null;
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
}
*/
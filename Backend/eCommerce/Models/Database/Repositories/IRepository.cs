using System;

namespace eCommerce.Models.Database.Repositories;

public interface IRepository<TEntity, TID> where TEntity : class
{
  //Llamada única a la base de datos con todas las consultas
  Task<ICollection<TEntity>> GetAllAsync();
  //Obtiene una consulta
  IQueryable<TEntity> GetQueryable(bool asNoTracking = true);

  //Funciones de Obtención, Inserción, Actualización y Eliminación de Datos
  Task<TEntity> GetByIdAsync(TID id);
  Task<TEntity> InsertAsync(TEntity entity);
  Task<TEntity> UpdateAsync(TEntity entity);
  Task DeleteAsync(TEntity entity);

  //Función para guardar los cambios
  Task<bool> SaveAsync();
  //Función para saber si existe en la base de datos
  Task<bool> ExistAsync(TID id);
}

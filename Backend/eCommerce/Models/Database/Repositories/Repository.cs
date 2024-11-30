using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eCommerce.Models.Database.Repositories;
public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : class
{
    private readonly DataContext _dbContext;
    public Repository(DataContext dbContext)
    {
        _dbContext = dbContext;
    }

    //Llamada única a la base de datos con todas las consultas
    public async Task<ICollection<TEntity>> GetAllAsync()
    {
        return await _dbContext.Set<TEntity>().ToArrayAsync();
    }
    //Obtiene una consulta
    public IQueryable<TEntity> GetQueryable(bool asNoTracking = true)
    {
        DbSet<TEntity> entities = _dbContext.Set<TEntity>();
        return asNoTracking ? entities.AsNoTracking() : entities;
    }

    //Funciones de Obtención, Inserción, Actualización y Eliminación de Datos
    public async Task<TEntity> GetByIdAsync(object id)
    {
        return await _dbContext.Set<TEntity>().FindAsync(id);
    }
    public async Task<TEntity> InsertAsync(TEntity entity)
    {
        EntityEntry<TEntity> entry = await _dbContext.Set<TEntity>().AddAsync(entity);
        return entry.Entity;
    }
    public TEntity Update(TEntity entity)
    {
        EntityEntry<TEntity> entry = _dbContext.Set<TEntity>().Update(entity);
        return entry.Entity;
    }
    public void Delete(TEntity entity)
    {
        _dbContext.Set<TEntity>().Remove(entity);
    }

    public async Task<bool> SaveAsync()
    {
        return await _dbContext.SaveChangesAsync() > 0;
    }

    //Función para saber si existe en la base de datos
    public async Task<bool> ExistAsync(object id)
    {
        return await GetByIdAsync(id) != null;
    }

    public Task<TEntity> UpdateAsync(TEntity entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(TEntity entity)
    {
        throw new NotImplementedException();
    }
}

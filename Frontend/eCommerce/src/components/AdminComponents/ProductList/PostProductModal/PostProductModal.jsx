import classes from './PostProductModal.module.css';

export default function PostProductModal() {
    return (
        <form id="productForm" className={classes.formContainer} method="post">
            <div>
                <label>Nombre: </label>
                <input type="text" name="name" id="name" />
            </div>
            <div>
                <label>Imagen: </label>
                <input type="text" name="image" id="image" />
            </div>
            <div>
                <label>Descripción: </label>
                <input type="text" name="description" id="description" />
            </div>
            <div>
                <label>Precio: </label>
                <input type="number" name="price" id="price" min={0} step="any" />
            </div>
            <div>
                <label>Stock: </label>
                <input type="number" name="stock" id="stock" min={0} step="any" />
            </div>
            <div>
            <label htmlFor="category">Categoría</label>
            
            <select id="category" name="category" >
              <option value={1}>Café</option>
              <option value={2}>Té</option>
              <option value={3}>Otros</option>
            </select>
          </div>

          <div>
            <label htmlFor="intensity">Intensidad</label>
            <select id="intensity" name="intensity" >
              <option value={0}>No</option>
              <option value={1}>Suave</option>
              <option value={2}>Medio</option>
              <option value={3}>Fuerte</option>
            </select>
          </div>
        </form>
    );
}

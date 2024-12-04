import { useState } from 'react';
import classes from './PostProductModal.module.css';

export default function PostProductModal({ cancelFnc }) {
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
                <label>Categoría: </label>
                <input type="number" name="category" id="category" />
            </div>
            <div>
                <label>Intensidad: </label>
                <input type="number" name="intensity" id="intensity" />
            </div>
            <div>
                <label>Precio: </label>
                <input type="number" name="price" id="price" />
            </div>
            <div>
                <label>Stock: </label>
                <input type="number" name="stock" id="stock" />
            </div>
        </form>
    );
}

import { useState } from "react";
import classes from "./AccordionElement.module.css"
import { API_BASE_URL } from "../../../../../endpoints/config";

export default function OpenedProduct({listElement, submit}) {
  const [isFocused, setIsFocused] = useState(false);
  function handleOnFocus() {setIsFocused(true)};
  function handleOnBlur() {setIsFocused(false)};

  return(
    <form id={listElement.id} className={`${classes.element_container} ${classes.form_container}`} onSubmit={submit}>
      <div className={`${classes.image_container} ${classes.formImage_container}`} onClick={handleOnFocus} onMouseLeave={handleOnBlur}>
        <img src={`${API_BASE_URL}${listElement.image}`} style={{display: isFocused ? "none" : "block"}}/>
        <textarea id="image" name="image" defaultValue={listElement.image} style={{visibility: isFocused ? "visible" : "hidden"}}/>
      </div>

      <div className={`${classes.data_container} ${classes.formData_container}`}>
        <h2>Producto: {listElement.id}</h2>
        <fieldset className={`${classes.data} ${classes.fieldsetData}`}>
          <div>
            <label htmlFor="name">Nombre</label>
            <input id="name" name="name" type="text" defaultValue={listElement.name} />
          </div>

          <div>
            <label htmlFor="price">Precio</label>
            <input id="price" name="price" type="number" defaultValue={listElement.price} min={0} step="any"/>
          </div>

          <div>
            <label htmlFor="stock">Stock</label>
            <input id="stock" name="stock" type="number" defaultValue={listElement.stock} min={0}/>
          </div>

          <div>
            <label htmlFor="category">Categoría</label>
            {console.log(listElement.category)}
            <select id="category" name="category" defaultValue={listElement.category}>
              <option value={1}>Café</option>
              <option value={2}>Té</option>
              <option value={3}>Otros</option>
            </select>
          </div>

          <div>
            <label htmlFor="intensity">Intensidad</label>
            <select id="intensity" name="intensity" defaultValue={listElement.intensity}>
              <option value={0}>No</option>
              <option value={1}>Suave</option>
              <option value={2}>Medio</option>
              <option value={3}>Fuerte</option>
            </select>
          </div>

          <label htmlFor="description">Descripción</label>
          <textarea id="description" name="description" type="text" defaultValue={listElement.description}/>
        </fieldset>
      </div>

      <div className={classes.button_container}>
        <input type="submit" value="⭕️"/>
        <input type="reset" value="❌"/>
      </div>
    </form>
  );
}
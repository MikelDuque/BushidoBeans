import { useState } from "react";
import classes from "./AccordionElement.module.css"

export default function OpenedProduct({listElement, closeFullElement}) {
  const [isFocused, setIsFocused] = useState(false);
  function handleOnFocus() {setIsFocused(true)};
  function handleOnBlur() {setIsFocused(false)};

  return(
    <form className={`${classes.element_container} ${classes.form_container}`} onSubmit={closeFullElement} onReset={closeFullElement}>
      <div className={`${classes.image_container} ${classes.formImage_container}`} onClick={handleOnFocus} onMouseLeave={handleOnBlur}>
        <img src={listElement.image} style={{display: isFocused ? "none" : "block"}}/>
        <textarea id="image" defaultValue={listElement.image} style={{visibility: isFocused ? "visible" : "hidden"}}/>
      </div>

      <div className={`${classes.data_container} ${classes.formData_container}`}>
        <h2>Producto: {listElement.id}</h2>
        <fieldset className={`${classes.data} ${classes.fieldsetData}`}>
          <div>
            <label htmlFor="name">Nombre</label>
            <input id="name" type="text" defaultValue={listElement.name} />
          </div>

          <div>
            <label htmlFor="price">Precio</label>
            <input id="price" type="number" defaultValue={listElement.price} min={0} step="any"/>
          </div>

          <div>
            <label htmlFor="stock">Stock</label>
            <input id="stock" type="number" defaultValue={listElement.stock} min={0}/>
          </div>

          <div>
            <label htmlFor="category">Categoría</label>
            <select id="category" defaultValue={listElement.category}>
              <option value={1}>Café</option>
              <option value={2}>Té</option>
              <option value={3}>Otros</option>
            </select>
          </div>

          <div>
            <label htmlFor="intensity">Intensidad</label>
            <select id="intensity" defaultValue={listElement.intensity}>
              <option value={0}>No</option>
              <option value={1}>Suave</option>
              <option value={2}>Medio</option>
              <option value={3}>Fuerte</option>
            </select>
          </div>

          <label htmlFor="description">Descripción</label>
          <textarea id="description" type="text" defaultValue={listElement.description}/>
        </fieldset>
      </div>

      <div className={classes.button_container}>
        <input type="submit" value="⭕️"/>
        <input type="reset" value="❌"/>
      </div>
    </form>
  );
}
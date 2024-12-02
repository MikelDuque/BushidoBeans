import classes from "./AccordionElement.module.css"

export default function AccordionElement({listElement}) {
  return(
    <div className={classes.element_container}>
      <img src={listElement.image}/>

      <div className={classes.data_container}>
        <h2>Producto: {listElement.id}</h2>
        <fieldset className={classes.form_container}>
          <div>
            <label htmlFor="name">Nombre</label>
            <input id="name" type="text" defaultValue={listElement.name} />
          </div>

          <div>
            <label htmlFor="price">Precio</label>
            <input id="price" type="number" defaultValue={listElement.price}/>
          </div>

          <div>
            <label htmlFor="stock">Stock</label>
            <input id="stock" type="number" defaultValue={listElement.stock}/>
          </div>

          <div className={classes.description}>
            <label htmlFor="description">Descripción</label>
            <input id="description" type="text" defaultValue={listElement.description}/>
          </div>
        </fieldset>
      </div>

      <div className={classes.button_container}>
        <a>⭕️</a>
        <a>❌</a>
      </div>
    </div>
  );
}
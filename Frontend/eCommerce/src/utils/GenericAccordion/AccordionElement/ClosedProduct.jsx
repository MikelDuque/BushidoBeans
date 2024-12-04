import { API_BASE_URL } from "../../../endpoints/config";
import classes from "./AccordionElement.module.css"

export default function ClosedProduct({listElement, openFullElement}) {
  return(
    <div className={`${classes.element_container} ${classes.list_container}`} onClick={openFullElement}>
      <div className={`${classes.image_container} ${classes.listImage_container}`}>
        <img src={`${API_BASE_URL}${listElement.image}`}/>
      </div>

      <div className={`${classes.data_container} ${classes.listData_container}`}>
        <h2>Producto: {listElement.id}</h2>
        <div className={`${classes.data} ${classes.listData}`}>
          <span className={classes.name}>{listElement.name.length < 30 ? listElement.name : `${listElement.name.substring(0, 29)}...`}</span>
          <span>Precio: {listElement.price}</span>
          <span>Stock: {listElement.stock}</span>
          <span>Categoría: {listElement.category}</span>
          <span>Intensidad: {listElement.intensity}</span>
        </div>
      </div>
      
    </div>
  )
}

function bodyConstructor(name) {
  
  return (name.length < 100 ? name : `${name.substring(0, 99)}...`);
  
  if (name.length > 100 ) {
    const subName = name.substring(0, 99);

    return (
      <>
        <span className={classes.name}>{`${subName}...`}</span>
      </>
    );
  };

  return <span className={classes.name}>{name}</span>
};
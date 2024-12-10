import { useCheckout } from "../../../../context/CheckoutContext";
import "./ListaDirecciones.css";

function ListaDirecciones({ direcciones }) {
  const { handleButtonClick, handleSelectedAddress } = useCheckout();

  return (
    <div className="container-lista-direcciones">
      <h4 className="titulo-direcciones">Lista de Direcciones</h4>
      {direcciones.length > 0 ? (
        <ul className="lista-direcciones">
          {direcciones.map((direccion, index) => (
            <li className="item-direccion" key={index} onClick={() => {handleSelectedAddress(direccion.id); handleButtonClick('confirm')}}>
              <p>{direccion.addressee}</p>
              <p>{direccion.phoneNumber}</p>
              <p>{direccion.addressInfo}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="texto lista-vacia">No tienes direcciones guardadas.</p>
      )}
    </div>
  );
}

export default ListaDirecciones;

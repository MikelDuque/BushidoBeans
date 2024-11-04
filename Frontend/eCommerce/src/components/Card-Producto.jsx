import PropTypes from "prop-types";
import '../styles/CardPrueba.css';

export function CardPrueba({ imagen, nombre, intensidad, precio, soldout }) {
    return (
        <div className="inventario">
            <div className={`cardPrueba ${soldout ? "sold-out" : ""}`}>
                <img className="imgPrueba" src={imagen} alt={nombre} />
                <h4 className="productName">{nombre}</h4>
                <div className="detallesDiv">
                    <p className="detalles">Intensidad: {intensidad}</p>
                    <p className="detalles">Precio: {precio} €</p>
                </div>
                {!soldout && (
                    <div className="añadirCestaJ">
                        <p>Añadir a la cesta</p>
                        <button className="botonPrueba" aria-label={`Añadir ${nombre} a la cesta`}>
                            🛒
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

CardPrueba.propTypes = {
    imagen: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    intensidad: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    soldout: PropTypes.bool
};

CardPrueba.defaultProps = {
    soldout: false
};

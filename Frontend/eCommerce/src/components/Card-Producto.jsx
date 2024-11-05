import PropTypes from "prop-types";
import '../styles/CardPrueba.css';

export function CardPrueba({ imagen, nombre, intensidad, precio, soldout }) {
    // Formatear el precio a dos decimales con coma
    const precioFormateado = precio.toFixed(2).replace('.', ',');
    const checksoldout = soldout ? "❌" : "✔️";

    // Determinar la imagen de intensidad (café o té)
    const intensidadImg = nombre.toLowerCase().includes("café")
        ? "/recursos/cafeIntensidad.svg"
        : "/recursos/teIntensidad.svg";

    // Crear un array para mostrar las imágenes de intensidad según el número
    const intensidadEmojis = Array(intensidad).fill(
        <img src={intensidadImg} alt="Intensidad" className="intensidadIcono" />
    );

    return (
        <div className="inventario">
            <div className={`cardPrueba ${soldout ? "sold-out" : ""}`}>
                <img className="imgPrueba" src={imagen} alt={nombre} />
                <a className="productName" href="../components/Input.jsx"><h4>{nombre}</h4></a>
                
                    <p className="detalles">
                         {intensidadEmojis.map((emoji, index) => (
                            <span key={index}>{emoji}</span>
                        ))}
                    </p>
                    <p className="detalles">{precioFormateado} €</p>
                    <p className="detalles">
                         {intensidadEmojis.map((emoji, index) => (
                            <span key={index}>{emoji}</span>
                        ))}
                    </p>
                    <p className="detalles">Stock: {checksoldout}</p>
                
                {!soldout && (
                    <button className="botonPrueba" aria-label={`Añadir ${nombre} a la cesta`}>
                        Añadir a la cesta 🛒
                    </button>
                   
                )}
            </div>
        </div>
    );
}

CardPrueba.propTypes = {
    imagen: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    intensidad: PropTypes.number.isRequired,
    precio: PropTypes.number.isRequired,
    soldout: PropTypes.bool
};

CardPrueba.defaultProps = {
    soldout: false
};

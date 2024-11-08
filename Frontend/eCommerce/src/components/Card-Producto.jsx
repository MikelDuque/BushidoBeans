import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import '../styles/CardPrueba.css';
import { getIntensidadImg } from '../utils/intensidad';

export function CardPrueba({ id, imagen, nombre, intensidad, precio, soldout, valoracion }) {
    const navigate = useNavigate();

    // Modificamos el manejo de la navegación para aceptar el id como argumento
    const handlePageChange = () => {
        navigate(`/producto/${id}`);  // Ahora se navega correctamente usando el id
    };

    const checksoldout = soldout ? "❌" : "✅";
    const precioFormateado = precio.toFixed(2).replace('.', ',');

    const valImg = "/recursos/star.svg";

    // Verifica que intensidad sea un número antes de pasarlo a getIntensidadImg
    const intensidadEmojis = Array(intensidad).fill(
        <img src={getIntensidadImg(intensidad.toString())} alt="Intensidad" className="intensidadIcono" />
    );

    const estrellasCompletas = Math.floor(valoracion);
    const tieneMediaEstrella = valoracion % 1 >= 0.5;

    const valoracionEstrellas = [
        // Añadir las estrellas completas
        Array(estrellasCompletas).fill(
            <img key={`star-`} src={valImg} alt="valoracion" className="intensidadIcono" />
        ),
        // Si tiene una media estrella, añadir la imagen de media estrella
        (tieneMediaEstrella ? [
            <img key={`star-`} src={valImg} alt="media valoración" className="intensidadIcono" style={{ clipPath: "inset(0 50% 0 0)" }} />
        ] : [])
    ];

    return (
        <div className={`cardPrueba ${soldout ? "sold-out" : ""}`}>
            <img className="imgPrueba" src={imagen} alt={nombre} />
            <h4 className="productName" onClick={handlePageChange}>{nombre}</h4>
            <div className="iconos">
                {intensidadEmojis}
            </div>
            <div className="detalles">{precioFormateado} €</div>
            <div className="iconos">
                {valoracionEstrellas}
            </div>
            <div className="detalles">Stock {checksoldout}</div>
            {!soldout && (
                <button className="botonPrueba" aria-label={`Añadir ${nombre} a la cesta`}>
                    Añadir a la cesta
                </button>
            )}
        </div>
    );
}

CardPrueba.propTypes = {
    id: PropTypes.string.isRequired, // Ahora el id es requerido como prop
    imagen: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    intensidad: PropTypes.number.isRequired,
    valoracion: PropTypes.number.isRequired,
    precio: PropTypes.number.isRequired,
    soldout: PropTypes.bool
};

CardPrueba.defaultProps = {
    soldout: false,
    valoracion: 3,
};

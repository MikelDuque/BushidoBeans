import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import '../styles/CardPrueba.css';
import { getIntensidadImg } from '../utils/intensidad';

export function CardPrueba({ id, imagen, nombre, intensidad, precio, stock, valoracion }) {
    const navigate = useNavigate();

    // Modificamos el manejo de la navegación para aceptar el id como argumento
    const handlePageChange = () => {
        navigate(`/producto/${id}`);  // Ahora se navega correctamente usando el id
    };

    
    const checksoldout = stock > 0 ? "✅" : "❌";
    const precioFormateado = precio.toFixed(2).replace('.', ',');
    const soldout = stock >0 ? true : false;

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
            <img src={valImg} alt="valoracion" className="intensidadIcono" />
        ),
        // Si tiene una media estrella, añadir la imagen de media estrella
        (tieneMediaEstrella ? [
            <img key={`star`} src={valImg} alt="media valoración" className="intensidadIcono" style={{ clipPath: "inset(0 50% 0 0)" }} />
        ] : [])
    ];

    return (
        <div className={`cardPrueba ${stock <= 0 ? "sold-out" : ""}`}>
            <img className="imgPrueba" src={`https://localhost:7015/${imagen}`} alt={nombre} />
            <h4 className="productName" onClick={handlePageChange}>{nombre}</h4>
            <div className="iconos">
                {intensidadEmojis}
            </div>
            <div className="detalles">{precioFormateado} €</div>
            <div className="iconos">
                {valoracionEstrellas}
            </div>
            <div className="detalles">Stock {checksoldout}</div>
            {soldout && (
                <button className="botonPrueba" aria-label={`Añadir ${nombre} a la cesta`}>
                    Añadir a la cesta
                </button>
            )}
        </div>
    );
}

CardPrueba.propTypes = {
    id: PropTypes.string, // Ahora el id es requerido como prop
    imagen: PropTypes.string,
    nombre: PropTypes.string.isRequired,
    intensidad: PropTypes.number.isRequired,
    valoracion: PropTypes.number.isRequired,
    precio: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired
};

CardPrueba.defaultProps = {
    soldout: false,
    valoracion: 3,
};

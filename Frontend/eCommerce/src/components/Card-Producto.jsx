import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import '../styles/CardPrueba.css';
import { getIntensidadImg } from '../utils/intensidad';

export function CardPrueba({ id, imagen, nombre, intensidad, precio, soldout }) {
    const navigate = useNavigate();

    const precioFormateado = precio.toFixed(2).replace('.', ',');
    const intensidadImg = getIntensidadImg(nombre);

    const intensidadEmojis = Array(intensidad).fill(
        <img src={intensidadImg} alt="Intensidad" className="intensidadIcono" />
    );

    const handleCardClick = () => {
        navigate(`/producto/${id}`);
        
    };

    return (
        <div className="inventario">
            <div className={`cardPrueba ${soldout ? "sold-out" : ""}`}>
                <img className="imgPrueba" src={imagen} alt={nombre} onClick={handleCardClick} />
                <h4 onClick={handleCardClick}>{nombre}</h4>
                
                <p className="detalles">
                    {intensidadEmojis.map((emoji, index) => (
                        <span key={index}>{emoji}</span>
                    ))}
                </p>
                <p className="detalles">{precioFormateado} €</p>
                
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
    id: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    intensidad: PropTypes.number.isRequired,
    precio: PropTypes.number.isRequired,
    soldout: PropTypes.bool
};

CardPrueba.defaultProps = {
    soldout: false
};

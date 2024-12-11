import { useNavigate } from 'react-router-dom';
import './CardProduct.css';
import { getIntensidadImg } from '../../utils/intensidad';
import AddToCartButton from "../AddToCartButton/AddToCart";
import { API_BASE_URL } from '../../endpoints/config';
import { API_BASE_URL } from '../../endpoints/config';
export function CardProduct({ product }) {
    const navigate = useNavigate();


    const handlePageChange = () => {
        navigate(`/producto/${product.id}`);  // Ahora se navega correctamente usando el id
    };

    const checksoldout = product.stock > 0 ? "✅" : "❌";
    const precioFormateado = product.price.toFixed(2).replace('.', ',');
    
    const valImg = "/recursos/star.svg";

    const intensidadEmojis = Array(product.intensity).fill(
        <img src={getIntensidadImg(product.intensity.toString())} alt="Intensidad" className="intensidadIcono" />
    );

    const estrellasCompletas = Math.floor(product.score);
    const tieneMediaEstrella = product.score % 1 >= 0.5;

    const valoracionEstrellas = [
        
        Array(estrellasCompletas).fill(
            <img src={valImg} alt="valoracion" className="intensidadIcono" />
        ),
        
        (tieneMediaEstrella ? [
            <img key={`star`} src={valImg} alt="media valoración" className="intensidadIcono" style={{ clipPath: "inset(0 50% 0 0)" }} />
        ] : [])
    ];

    return (
        <div className={`CardProduct ${product.stock <= 0 ? "sold-out" : ""}`}>
            <img className="imgPrueba" src={`${API_BASE_URL}${product.image}`} alt={product.name} />
            <h4 className="productName" onClick={handlePageChange}>{product.name}</h4>
	    <div className="iconos">
                {valoracionEstrellas}
            </div>
	    <div className="detalles2">Stock {checksoldout}</div>
	    <div className="iconos">
                {intensidadEmojis}
            </div>
	    <div className="detalles2">{precioFormateado} €</div>
            <AddToCartButton className="botonPrueba" product={product}></AddToCartButton>
        </div>
    );
}

export default CardProduct;
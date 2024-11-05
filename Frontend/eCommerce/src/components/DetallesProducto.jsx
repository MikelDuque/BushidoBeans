import { useParams } from 'react-router-dom';
import productData from '../data/dataPrueba';
import "../styles/DetallesProducto.css"
import Header from './Header';
import Footer from './Footer';

const ProductDetails = () => {
    const { id } = useParams();
    const producto = productData.find((producto) => producto.id === parseInt(id));
    if (!producto) {
        return <div><NotFound></NotFound></div>;
    }
    return (
        <div className='container-producto'>
            <Header />
            < div className='container-info-producto'>
                <p className='titulo nombreProducto'>{producto.nombre}</p>
                <div className='imagen-producto'><img src={producto.imagen} alt={producto.nombre} /></div>
                <div><p className='subtitulo intensidad'>Intensidad {producto.intensidad}</p></div>
                <p className='subtitulo precio'>Precio: {producto.precio}€</p>
                <p className='subtitulo disponibilidad'>Disponibilidad: {producto.soldout ? 'Sin stock' : 'En stock'}</p>
            </div>

            <hr className='separador'/>

            <div className='container-reseña'></div>

            <hr className='separador'/>

            <div className='container-recomendacion-productos'></div>
            <Footer />
        </div>

    );
};

export default ProductDetails;

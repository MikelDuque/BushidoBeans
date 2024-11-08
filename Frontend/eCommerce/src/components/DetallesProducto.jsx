import { useParams } from 'react-router-dom';
import productData from '../data/dataPrueba';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';
import '../styles/DetallesProducto.css';
import { getIntensidadImg } from '../utils/intensidad';

function DetallesProducto() {
    const { id } = useParams();
    const producto = productData.find((producto) => producto.id === parseInt(id));
    
    const [cantidad, setCantidad] = useState(1);

    const aumentarCantidad = () => {
        if (cantidad < 10) {
            setCantidad(cantidad + 1);
        }
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const intensidadImg = getIntensidadImg(producto.nombre);

    return (
        <div className='container-producto'>
            <Header />
            <div className='container-info-producto'>
                <div className='imagen-producto'>
                    <img src={producto.imagen} alt={producto.nombre} />
                </div>

                <div className='detalles'>
                    <p className='nombreProducto titulo'>{producto.nombre}</p>
                    <p className='subtitulo intensidad'>
                        Intensidad: 
                        <span className='texto'>
                            {Array(producto.intensidad).fill(
                                <img src={intensidadImg} alt="Intensidad" className="intensidadIcono" />
                            )}
                        </span>
                    </p>
                    <p className='subtitulo precio'>
                        Precio: <span className='texto'>{producto.precio}</span>€
                    </p>
                    <p className='subtitulo disponibilidad'>
                        Disponibilidad: <span className='texto'>{producto.soldout ? 'Sin stock' : 'En stock'}</span>
                    </p>
                    <p className='subtitulo descripcion'>
                        <span className='texto'>{producto.descripcion}</span>
                    </p>

                    <div className='container-boton-cantidad'>
                        <button className='boton-cantidad' onClick={disminuirCantidad} disabled={cantidad <= 1}>-</button>
                        <span>{cantidad}</span>
                        <button className='boton-cantidad' onClick={aumentarCantidad} disabled={producto.soldout}>+</button>
                    </div>

                    <button className='boton-agregar-carrito' disabled={producto.soldout}>
                        {producto.soldout ? 'Producto sin stock' : 'Añadir al carrito'}
                    </button>
                </div>
            </div>
            <div className='container-recomendaciones'>
                
            </div>
            <Footer />
        </div>
    );
}

export default DetallesProducto;

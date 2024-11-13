import { useParams } from 'react-router-dom';
import productData from '../data/dataPrueba';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import '../styles/DetallesProducto.css';
import { getIntensidadImg } from '../utils/intensidad';
import Reviews from '../components/Reviews';
function DetallesProducto() {
    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);

    //FetchData para las Reviews
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`https://localhost:7015/api/Product/Product_Details?id=${id}`, {
                   method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                });
                const data = await response.json();
                setProducto(data);
            } catch (error) {
                console.error('Error al cargar el producto:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

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
    console.log(producto);

    return (
        <div className='container-producto'>
            <Header />
            <div className='container-info-producto'>
                <div className='imagen-producto'>
                    <img src={`https://localhost:7015/${producto.imagen}`} alt={producto.nombre} />
                </div>

                <div>
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


            <div className='container-reviews'>
                <h2>Reviews</h2>
                <Reviews reviews={data.Reviews}></Reviews>
            </div>


            <div className='container-recomendaciones'>

            </div>
            <Footer />
        </div>
    );
}

export default DetallesProducto;

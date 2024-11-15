import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef} from 'react';

import '../styles/DetallesProducto.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Review_List from '../components/Review_List/Review_List';

import { getIntensidadImg } from '../utils/intensidad';

function DetallesProducto() {
    const navigate = useNavigate();
    const handlePageChange = () => {
        navigate(`/producto/${id}/reseña`);  // Ahora se navega correctamente usando el id
    };
    
    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    
    const productRef = useRef({
        reviews: [],
        score: 0.0
    });

    //FetchData para las Reviews
    useEffect(() => {
        const fetchProducto = async () => {
            setLoading(true);
            setError(null);

            try {
                const Url = 'https://localhost:7015/api/Product/Product_Details'
                const response = await fetch(`${Url}?id=${id}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                console.log("respuesta", response)
                if (!response.ok) throw new Error('Error al cargar la respuesta');
                setLoading(false);

                const data = await response.json();
                console.log("data:", data)
                setProducto(data);
                
                productRef.current = {
                    reviews: data.reviews,
                    score: data.score
                }

            } catch (error) {
                setError('Error al cargar el producto (catch)');
            } finally {
                setLoading(false);
            }

        };

        fetchProducto();
    }, []);

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

    const intensidadImg = getIntensidadImg("café");
    

    /*
    function getReview() {
        return review = {
            id: producto.reviews[0].id,
            score: producto.reviews[0].score,
            body: producto.reviews[0].body,
            userName: producto.reviews[0].userName,
            avatar: ""
        }
    }
    */  

    return (
        <div className='container-producto'>
            <Header />
            {loading ? (
                <p>Cargando producto...</p>
            ) : error ? (
                <p>{error}</p>
            ) : producto != null ? (
            <>
            <div className='container-info-producto'>
                <div className='imagen-producto'>
                    <img src={`https://localhost:7015/${producto.image}`} alt={producto.name} />
                </div>

                <div>
                    <p className='nombreProducto titulo'>{producto.name}</p>
                    <p className='subtitulo intensidad'>
                        Intensidad:
                        <span className='texto'>
                            {Array(producto.intensity).fill(
                                <img src={intensidadImg} alt="Intensidad" className="intensidadIcono" />
                            )}
                        </span>
                    </p>
                    <p className='subtitulo precio'>
                        Precio: <span className='texto'>{producto.price}</span>€
                    </p>
                    <p className='subtitulo disponibilidad'>
                        Disponibilidad: <span className='texto'>{producto.stock > 0 ? 'En Stock' : 'Sin stock'}</span>
                    </p>
                    <p className='subtitulo descripcion'>
                        <span className='texto'>{producto.description}</span>
                    </p>

                    <div className='container-boton-cantidad'>
                        <button className='boton-cantidad' onClick={disminuirCantidad} disabled={cantidad <= 1}>-</button>
                        <span>{cantidad}</span>
                        <button className='boton-cantidad' onClick={aumentarCantidad} disabled={producto.stock}>+</button>
                    </div>

                    <button className='boton-agregar-carrito' disabled={producto.stock}>
                        {producto.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
                    </button>
                </div>  
            </div>
            {/*
            <div className='container-reviews'>
                <h2>Reviews</h2>
                <Reviews reviews={producto.reviews}></Reviews>
            </div>
            <button className="productName" onClick={handlePageChange}>Enviar Reseña</button>
            */}

            <div className='container-recomendaciones'> </div>
            </>
            ) : (
                <p>No se encontraron productos.</p>
            )};

            <Review_List
                data={productRef.current}
            />
            <Footer />
        </div>
    );
}

export default DetallesProducto;

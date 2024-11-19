import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect} from 'react';
import '../styles/DetallesProducto.css';

import Product_Details from '../components/Product_Details/Product_Details';
import Review_List from '../components/Review_List/Review_List';


function DetallesProducto() {    
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

                setProducto(data);
                console.log("hola",data);
                
                
            } catch (error) {
                setError('Error al cargar el producto (catch)');
            } finally {
                setLoading(false);
            }

        };

        fetchProducto();
    }, [id]);

    return (
        <>
        <Header />
        <div className='container-producto'>
            {loading ? (
                <p>Cargando producto...</p>
            ) : error ? (
                <p>{error}</p>
            ) : producto != null ? (
            <>
                <Product_Details product={producto}/>
                <Review_List data={{reviews: producto.reviews, score: producto.score}}/>
            </>
            ) : (
                <p>No se encontraron productos.</p>
            )}  
        </div>
        <Footer />
        </>
    );
}

export default DetallesProducto;

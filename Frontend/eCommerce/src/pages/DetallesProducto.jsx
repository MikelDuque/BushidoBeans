import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { GET_PRODUCT_BY_ID } from '../endpoints/config';
import useFetch from '../endpoints/useFetch';
import { useReview } from '../context/ReviewContext'
import Product_Details from '../components/Product_Details/Product_Details';
import Review_List from '../components/Review_List/Review_List';

import '../styles/DetallesProducto.css';

function DetallesProducto() { 
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const {
        reviewList,
        setProductId,
        addReview
    } = useReview();
    
    /*
    useEffect(() => {
        const {isLoading, error, fetchData} = useFetch({Url:GET_PRODUCT_BY_ID(id), type:'GET', params:id});

        if(error == null) {
            setProduct(fetchData);
            setProductId(id);
        }
    }, [id]);   //¿Hace falta poner el id ahí?
    */

    /*
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

            } catch (error) {
                setError('Error al cargar el producto (catch)');
            } finally {
                setLoading(false);
            }

        };

        fetchProducto();
    }, [id]);
    */

    return (
        <>
        <Header />
        <div className='container-producto'>
            {isLoading ? (
                <p>Cargando producto...</p>
            ) : error ? (
                <p>{error}</p>
            ) : producto != null ? (
            <>
                <Product_Details product={product}/>
                <Review_List data={{reviews: reviewList, score: product.score}}/>
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

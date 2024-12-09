import { useParams } from 'react-router-dom';

import { GET_PRODUCT_BY_ID } from '../../endpoints/config';
import useFetch from '../../endpoints/useFetch';
import ProductDetails_Card from '../../components/catalogo/Product_Details/ProductCard/ProductDetails_Card';
import Review_List from '../../components/Catalogo/Product_Details/Review_List/Review_List';

import classes from './ProductDetails.module.css';

export default function ProductDetails() { 
    const { id } = useParams();
    const {fetchData: product, fetchError, isLoading} = useFetch({url:GET_PRODUCT_BY_ID(id), type:'GET'});

    return (
        <div className={classes.container}>
            {isLoading ? (
                <p>Cargando producto...</p>
            ) : fetchError ? (
                <p>{fetchError || "Ha ocurrido un error" }</p>
            ) : product != null ? (
            <>
                <ProductDetails_Card product={product}/>
                <Review_List data={{reviews: product.reviews, score: product.score}}/>
            </>
            ) : (
                <p>No se encontraron productos.</p>
            )}  
        </div>
    );
}
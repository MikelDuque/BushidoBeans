import { useParams } from 'react-router-dom';
import { GET_PRODUCT_BY_ID } from '../../endpoints/config';
import useFetch from '../../endpoints/useFetch';
import ProductDetails_Card from '../../components/Product_Details/ProductCard/ProductDetails_Card';
import Review_List from '../../components/Product_Details/Review_List/Review_List';
import classes from './ProductDetails.module.css';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const {fetchData: product, fetchError, isLoading} = useFetch({url:GET_PRODUCT_BY_ID(id), type:'GET', needAuth:false});

    useEffect(() => {
        if (product) {
            setReviews(product.reviews);
        }
    }, [product]);

    /*const handleAddReview = (newReview) => {
        setReviews((prevReviews) => [...prevReviews, newReview]);
    };*/

    return (
        <div className={classes.container}>
            {isLoading ? (
                <p>Cargando producto...</p>
            ) : fetchError ? (
                <p>{fetchError || "Ha ocurrido un error"}</p>
            ) : product != null ? (
            <>
                <ProductDetails_Card product={product}/>
                <Review_List data={{reviews: reviews, score: product.score}} />
            </>
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
}

import { useState, useEffect } from 'react';
import { GET_PRODUCTS, PUT_PRODUCT } from "../../../endpoints/config";
import { useAuth } from "../../../context/AuthContext";

import ProductAccordion from './ProductAccordion/ProductAccordion';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const {token} = useAuth();

    useEffect(() => {
        if(token) getProducts();
    }, [token]);

    async function getProducts() {
        try {
            const response = await fetch(GET_PRODUCTS);
            const data = await response.json();
            setProducts(data || []);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const thisElement = event.target;   
        
        const productToUpdate = {
            Id: thisElement.id,
            Name: thisElement.name.value,
            Price: thisElement.price.value,
            Stock: thisElement.stock.value,
            Image: thisElement.image.value,
            Description: thisElement.description.value,
            Category: thisElement.category.value,
            Intensity: thisElement.intensity.value
        };    

        try {
            const response = await fetch(PUT_PRODUCT, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productToUpdate),
            });
            
            if (!response.ok) {throw new Error(response.status);}
            else {getProducts();}
            
        } catch (error) {
            setError(error.message);
            console.log("Error: ", error.message);  
        }
    };

    return (
        <div>
            {error ? <p>Error: {error}</p> : <ProductAccordion list={products} submit={handleUpdate}/>}
        </div>
    );
};
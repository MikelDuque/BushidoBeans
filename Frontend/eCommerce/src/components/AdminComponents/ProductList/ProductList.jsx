import { useState, useEffect, useRef } from 'react';
import {GET_PRODUCTS } from "../../../endpoints/config";
import {useAuth} from "../../../context/AuthContext";

import classes from "./ProductList.module.css"
import ProductAccordion from '../../../utils/GenericAccordion/AccordionElement/ProductAccordion';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const selectedProduct = useRef(null);

    const {token} = useAuth();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(GET_PRODUCTS);
                const data = await response.json();
                setProducts(data || []);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchProducts();
    }, []);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
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
            Category: thisElement.category.value
        };

        console.log(productToUpdate);
        

        try {
            const response = await fetch('https://localhost:7015/api/Product/Update_Product', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productToUpdate),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            } else {
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === selectedProduct.id ? selectedProduct : product
                    )
                );
            }
        } catch (error) {
            setError(error.message);
            console.log("Error: ", error.message);
            
        }
    };

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <ProductAccordion list={products} submit={handleUpdate}/>
            {/*
            <ul className={classes.list_container}>
                {products.map((product) => (
                    <li className={classes.list_element} key={product.id} onClick={() => handleProductSelect(product)}>
                        {product.id} - {product.name} - {product.price} €
                    </li>
                ))}
            </ul>

            {selectedProduct && (
                <div>
                    <h3>Editar Producto</h3>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="name"
                            value={selectedProduct.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Precio:
                        <input
                            type="number"
                            name="price"
                            value={selectedProduct.price}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        ID Categoría:
                        <input
                            type="text"
                            name="categoryId"
                            value={selectedProduct.categoryId}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Descripción:
                        <input
                            type="text"
                            name="description"
                            value={selectedProduct.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Imagen:
                        <input
                            type="text"
                            name="image"
                            value={selectedProduct.image}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Stock:
                        <input
                            type="number"
                            name="stock"
                            value={selectedProduct.stock}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button onClick={handleUpdate}>Actualizar</button>
                </div>
            )}
            */}
        </div>
    );
};
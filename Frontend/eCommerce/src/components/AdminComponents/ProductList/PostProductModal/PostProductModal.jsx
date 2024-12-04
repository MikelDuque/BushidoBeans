import classes from "./PostProductModal.module.css";
import { useState, useEffect } from 'react';

export default function PostProductModal(){

    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            try {
                setToken(storedToken);
            } catch (error) {
                console.error("Error al decodificar el token", error);
                localStorage.removeItem('accessToken');
            }
        }
    }, []); 
 
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formData2 = Object.fromEntries(formData.entries());
        const productToPost = {
            name: formData2.name,
            price: parseFloat(formData2.price),
            stock: parseInt(formData2.stock),
            intensity: parseInt(formData2.intensity),
            image: formData2.image,
            description: formData2.description,
            category: parseInt(formData2.category)
        };
        console.log("esto se envia", productToPost);
        
        // Puedes pasar formData como el cuerpo de la consulta directamente:
        //fetch('/some-api', { method: form.method, body: formData });
        
    try{
        const formJson = Object.fromEntries(formData.entries());
        const response = await fetch('https://localhost:7015/api/Product/Create_Product', {
             method: 'POST', 
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
             body: JSON.stringify(productToPost) });

 
        console.log("formJson",formJson);
        console.log("formData", JSON.stringify(formData));
        

        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        } 
        }catch{
        alert("no ha sido posible hacer el fetch")
    }
        

        
}

    return (
            <form className={classes.formContainer} method="post" onSubmit={handleSubmit}>
                <div>
                    <label>
                    name: 
                </label>
                <input type="text" name="name" id="name" />
                </div>
                <div>
                    <label>
                    image: 
                </label>
                <input type="text" name="image" id="image" />
                </div>
                <div>
                    <label>
                    description: 
                </label>
                <input type="text" name="description" id="description" />
                </div>
                <div>
                    <label>
                    category: 
                </label>
                <input type="number" name="category" id="category" />
                </div>
                <div>
                    <label>
                    intensity: 
                </label>
                <input type="number" name="intensity" id="intensity" />
                </div>
                <div>
                    <label>
                    price: 
                </label>
                <input type="number" name="price" id="price" />
                </div>
                <div>
                    <label>
                    stock: 
                </label>
                <input type="number" name="stock" id="stock" />
                </div>
                <button onSubmit={handleSubmit}>ENviar</button>
            </form>


    );
}
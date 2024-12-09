import { useState } from 'react';
import ProductList from '../../components/AdminComponents/ProductList/ProductList.jsx';
import UserList from '../../components/AdminComponents/UserList/UserList.jsx';
import classes from './AdminView.module.css';
import SwitchButton from '../../components/AdminComponents/SwitchButton/SwitchButton.jsx';
import { useModal } from '../../context/ModalContext.jsx';
import Modal from '../../components/Modals/Modal.jsx';
import PostProductModal from '../../components/AdminComponents/ProductList/PostProductModal/PostProductModal.jsx';
import { POST_PRODUCT } from '../../endpoints/config.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminView() {
    const [view, setView] = useState(false);   
    const { openModal, closeModal } = useModal(); 
    const {token} = useAuth();

    function handleView(view) {
        setView(view);
    }

    const continueSubmit = async () => {
        
        const form = document.getElementById("productForm");  
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
        console.log("token", token);
        console.log();
        
        console.log("esto se envia", productToPost);

        try {
            console.log("token prueba", token);
            
            const response = await fetch(POST_PRODUCT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productToPost)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }

            console.log("Producto creado exitosamente");
        } catch (error) {
            alert("No ha sido posible hacer el fetch");
            console.error(error);
        } finally {
            closeModal();  
        }
    };

    
    const cancelSubmit = () => {
        closeModal(); 
    };

    return (
        <div className={classes.container}>
            <SwitchButton setView={handleView} />
            {!view && (
                <button className={classes.buttonAñadirProducto} onClick={() => openModal("postProduct")}>Añadir producto</button>
            )}
            <Modal
                buttonValues={{ continueVal: "Enviar", cancelVal: "Cancelar" }}
                type="postProduct"
                titulo="Nuevo Producto"
                continueFnc={continueSubmit}  
                cancelFnc={cancelSubmit}  
            >
                <PostProductModal />
            </Modal>
            <div className={classes.view_container}>
                {view ? <UserList /> : <ProductList />}
            </div>
        </div>
    );
};

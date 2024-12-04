import { useState } from 'react';
import ProductList from '../../components/AdminComponents/ProductList/ProductList.jsx';
import UserList from '../../components/AdminComponents/UserList/UserList.jsx';
import classes from './AdminView.module.css';
import SwitchButton from '../../components/AdminComponents/SwitchButton/SwitchButton.jsx';
import { useModal } from '../../context/ModalContext.jsx';
import Modal from '../../components/Modals/Modal.jsx';
import PostProductModal from '../../components/AdminComponents/ProductList/PostProductModal/PostProductModal.jsx';

export default function AdminView() {
    const [view, setView] = useState(false);   
    const { isOpen, openModal, closeModal } = useModal(); 
    const [token, setToken] = useState(null);

   
    useState(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []); 

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

        console.log("esto se envia", productToPost);

        try {
            const response = await fetch('https://localhost:7015/api/Product/Create_Product', {
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
            <button onClick={openModal}>Añadir producto</button>

            {isOpen && (
                <Modal
                    buttonValues={{ continueVal: "Enviar", cancelVal: "Cancelar" }}
                    type="postProduct"
                    titulo="Nuevo Producto"
                    continueFnc={continueSubmit}  
                    cancelFnc={cancelSubmit}  
                >
                    <PostProductModal />
                </Modal>
            )}

            <div className={classes.view_container}>
                {view ? <UserList /> : <ProductList />}
            </div>
        </div>
    );
};

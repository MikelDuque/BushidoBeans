import { useState } from 'react';
import ProductList from '../../components/AdminComponents/ProductList/ProductList.jsx';
import UserList from '../../components/AdminComponents/UserList/UserList.jsx';

import classes from './AdminView.module.css';
import SwitchButton from '../../components/AdminComponents/SwitchButton/SwitchButton.jsx';
import { useModal } from '../../context/ModalContext.jsx'
import Modal from '../../components/Modals/Modal.jsx'
import PostProductModal from '../../components/AdminComponents/ProductList/PostProductModal/PostProductModal.jsx';

export default function AdminView() {
    const [view, setView] = useState(false);    // False: "productList", True: "userList"
    const { isOpen, openModal } = useModal();

    function handleView(view) {
        setView(view);
    }

    const carritoPrueba = [];

    for (let i = 0; i < 25; i++) {
        carritoPrueba.push({
            id: i,
            image: "https://i.pinimg.com/1200x/fb/8a/e7/fb8ae7c303d6e25bdc91f85c16be2704.jpg",
            name: "Este es un nombre de prueba",
            category: 2,
            price: 2.55,
            stock: 20,
            intensity: 0,
            description: "owihngfowiknofknwef"
        });
    };

    return (
        <div className={classes.container}>
            <SwitchButton setView={handleView}/>
            <button onClick={openModal}>Añadir producto</button>
            
            {isOpen && (
            <Modal buttonValues={{continueVal: "Guardar",cancelVal: "Cancelar"}} type="postProduct" titulo="Nuevo Producto">
                <PostProductModal />
            </Modal>
            )}
            <div className={classes.view_container}>
                {view ? <UserList /> : <ProductList />}
            </div>
        </div>
    );
};
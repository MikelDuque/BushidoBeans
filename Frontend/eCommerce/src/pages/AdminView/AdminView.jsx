import { useState } from 'react';

import ProductList from '../../components/AdminComponents/ProductList/ProductList.jsx';
import UserList from '../../components/AdminComponents/UserList/UserList.jsx';

import classes from './AdminView.module.css';
import SwitchButton from '../../components/AdminComponents/SwitchButton/SwitchButton.jsx';
import Accordion from '../../utils/GenericAccordion/Accordion.jsx';

export default function AdminView() {
    const [view, setView] = useState(false);    // False: "productList", True: "userList"

    function handleView(view) {
        setView(view);
    }

    const carritoPrueba = [];

    for (let i = 0; i < 25; i++) {
        carritoPrueba.push({
            id: i,
            image: "https://i.pinimg.com/1200x/fb/8a/e7/fb8ae7c303d6e25bdc91f85c16be2704.jpg",
            name: "Nombre de Prueba",
            price: 2.55,
            stock: 20
        });
    };

    return (
        <div className={classes.container}>
            <SwitchButton setView={handleView}/>
            <div className={classes.view_container}>
                <Accordion list={carritoPrueba}/>
                {view ? <UserList /> : <ProductList />}
            </div>
        </div>
    );
};
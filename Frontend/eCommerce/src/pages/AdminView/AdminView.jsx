import { useState } from 'react';

import ProductList from '../../components/AdminComponents/ProductList/ProductList.jsx';
import UserList from '../../components/AdminComponents/UserList/UserList.jsx';

import classes from './AdminView.module.css';
import SwitchButton from '../../components/AdminComponents/SwitchButton/SwitchButton.jsx';

export default function AdminView() {
    const [view, setView] = useState(false);    // False: "productList", True: "userList"

    function handleView(view) {
        setView(view);
    }

    return (
        <div className={classes.container}>
            <SwitchButton setView={handleView}/>
            <div className={classes.view_container}>
                {view ? <UserList /> : <ProductList />}
            </div>
        </div>
    );
};
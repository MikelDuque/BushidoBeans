import React, { useState } from 'react';
import ProductAdmin from './ProductAdmin/ProductAdmin.jsx';
import UserAdmin from './UserAdmin/UserAdmin.jsx';

const SwitchAdmin = () => {
    const [view, setView] = useState('products');

    return (
        <div>
            <h1>Vista Admin</h1>
            <div>
                <button onClick={() => setView('products')}>Ver Productos</button>
                <button onClick={() => setView('users')}>Ver Usuarios</button>
            </div>
            <div>
                {view === 'products' ? <ProductAdmin /> : <UserAdmin />}
            </div>
        </div>
    );
};

export default SwitchAdmin;

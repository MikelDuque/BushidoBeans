import { useState } from 'react';
import ProductAdmin from './ProductAdmin/ProductAdmin.jsx';
import UserAdmin from './UserAdmin/UserAdmin.jsx';
import '../../styles/VistaAdmin.css';

const SwitchAdmin = () => {
    const [view, setView] = useState('products');

    return (
        <div className='ContainerVistaAdmin'>
            <h1 className='VistaAdminText'>Vista Admin</h1>
            <div className='ContainerBotones'>
                <button className='ProductsButton' onClick={() => setView('products')}>Ver Productos</button>
                <button className='UsersButton' onClick={() => setView('users')}>Ver Usuarios</button>
            </div>
            <div className='ContainerVistas'>
                {view === 'products' ? <ProductAdmin /> : <UserAdmin />}
            </div>
        </div>
    );
};

export default SwitchAdmin;

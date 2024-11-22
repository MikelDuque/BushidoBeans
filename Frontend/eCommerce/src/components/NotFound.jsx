import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };
    return (
        <div className='container-not-found'>
            <Header/>
            <div>
            <p className='titulo texto-not-found'>ERROR 404</p>
            <p className='subtitulo texto-buscar-oro'>Vaya, viniste buscando oro y encontraste... ¡nada!</p>
            <p className='texto texto-pagina-construccion'>Esta pagina se encuentra actualmente en construccion, disculpa las molestias</p>
            <button onClick={handleGoHome}>Ir a la pagina principal</button>
            </div>
            <Footer/>
        </div>
    );
};

export default NotFound;

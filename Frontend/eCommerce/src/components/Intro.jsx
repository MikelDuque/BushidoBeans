import React, { useEffect, useState } from 'react';
import './intro.css'

const ScrollIntro = () => {
    const [esVisible, setEsVisible] = useState(true);

    useEffect(() => {

        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            setTimeout(() => { setEsVisible(false);
            window.scrollTo({top: 0});
            document.body.style.overflow = ''; }, 450); //Tiempo para eliminar la imagen
        }, 3000); //Tiempo total animación

        return () => clearTimeout(timer);
        document.body.style.overflow = '';
    }, []
    );

    return (
        <div>
            {esVisible && (
                <div className='introDiv'>
                    <img className='introImg' src='/recursos/FootLogoD.png'/>
                </div>
            )}
        </div>
    );
};

export default ScrollIntro;

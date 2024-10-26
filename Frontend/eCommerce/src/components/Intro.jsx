import React, { useEffect, useState } from 'react';
import './intro.css'

const ScrollIntro = () => {
    const [esVisible, setEsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            setTimeout(() => { setEsVisible(false) }, 450); //Tiempo para eliminar la imagen
        }, 2000); //Tiempo total animación

        return () => clearTimeout(timer);
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

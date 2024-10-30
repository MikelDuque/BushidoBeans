import React, { useEffect, useState } from 'react';
import '../styles/intro.css'

const ScrollIntro = () => {
    const [esVisible, setEsVisible] = useState(true);

    useEffect(() => {

        document.body.style.overflow = 'hidden';
        

        const timer = setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            setTimeout(() => { setEsVisible(false);
            window.scrollTo({top: 0});
            document.body.style.overflow = ''; }, 450);     //Tiempo de animación
        }, 3500);   //Delay antes de animación

        return () => clearTimeout(timer);
        document.body.style.overflow = '';
    }, []
    );

    return (
        <div>
            {esVisible && (
                <div className='introDiv'>
                    <img className='introImg' src='/recursos/LogoIntro.png'/>
                </div>
            )}
        </div>
    );
};

export default ScrollIntro;
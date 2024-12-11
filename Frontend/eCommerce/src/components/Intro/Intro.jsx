import { useEffect, useState } from 'react';
import classes from './Intro.module.css';

const ScrollIntro = () => {
    const [esVisible, setEsVisible] = useState(true);

    useEffect(() => {

        document.body.style.overflow = 'hidden';
        

        const timer = setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            setTimeout(() => {
                setEsVisible(false);
                window.scrollTo({ top: 0 });
                document.body.style.overflow = '';
            }, 450);     //Tiempo de animación
        }, 3500);   //Delay antes de animación

        return () => clearTimeout(timer);
    }, []
    );

    return (
        <div>
            <div className={classes.introDisplay}>
                {esVisible && (
                    <div className={classes.introDiv}>
                        <img className={classes.introImg} src='../recursos/LogoIntro.png' />
                    </div>
                )}
            </div>
            <div className={classes.introHidden}>
                {esVisible && (
                    <div className={classes.introDiv}>
                        <img className={classes.introImg} src='../recursos/LogoD.png' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScrollIntro;
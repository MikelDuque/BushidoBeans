import { useNavigate } from "react-router-dom";
import classes from "./NotFound.module.css";

export default function NotFound() {
    const navigateTo = useNavigate();

    function handleGoHome() {
        navigateTo('/');
    };

    return (
        <div className={classes.container}>
            <p className={`${classes.titulo} ${classes.texto_NotFound}`}>ERROR 404</p>
            <p className={`${classes.subtitulo} ${classes.texto_buscarOro}`}>Vaya, viniste buscando oro y encontraste... ¡nada!</p>
            <p className={`${classes.texto} ${classes.texto_paginaConstruccion}`}>Esta pagina se encuentra actualmente en construccion, disculpa las molestias</p>
            <button onClick={handleGoHome}>Ir a la pagina principal</button>
        </div>
    );
};
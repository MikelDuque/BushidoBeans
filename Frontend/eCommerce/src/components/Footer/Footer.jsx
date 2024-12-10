import {useNavigate} from "react-router-dom";
import classes from './Footer.module.css';

function Footer() {

  const navigate = useNavigate()
  const handleInicio = ()=>{navigate('/')}

  return (
    <footer>
      <div className={classes.fContent}>
      <div className={classes.fLogo} src="recursos/FootLogoD.png" onClick={handleInicio}/>

      <div className={classes.terms}>
      <p>Condiciones de Uso y Venta.</p>
      <p>Aviso de privacidad.</p>
      <p>Área legal.</p>
      <p>Cookies.</p>
      </div>
      
      

      <div className={classes.redes}>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src="recursos/Instagram.png" />bushidobeans</a>
        <a href="https://x.com/?lang=es" target="_blank" rel="noopener noreferrer">
          <img src="recursos/XTwitter.png" />@bushidobeans</a>
        <a href="https://www.tiktok.com/es/" target="_blank" rel="noopener noreferrer">
          <img src="recursos/TikTok.png" />@bushidobeans</a>
      </div></div>

      <p className={classes.end}>© 2024 Bushido Beans. Todos los derechos reservados.</p>

      
    </footer>
  );
}

export default Footer;

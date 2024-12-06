import { LOGIN_URL } from "../../../endpoints/config";
import { useAuth } from "../../../context/AuthContext";
import { validation } from '../../../utils/validationForm';
import useFetchEvent from "../../../endpoints/useFetchEvent";

import classes from "./Login.module.css";

export default function Login({handleViewChange, setAlertMessage}) {
  
  /* ----- HOOKS ----- */

  const {handleLogin} = useAuth();

  const {fetchingData, error, isLoading} = useFetchEvent();

  
  /* ----- FUNCIONES ----- */

  async function handleLoginData(event) {
    event.preventDefault();
    const form = event.target;

    const loginData = {
      mail: form.email.value,
      password: form.password.value
    };

    if(!dataValidator(loginData.mail, loginData.password)) return;
    
    const data = await fetchingData({url: LOGIN_URL, type: 'POST', params:loginData});

    if(data) handleLogin(data.accessToken);
  };


  function dataValidator(email, password) {
    if (!validation.isValidEmail(email)) {
      setAlertMessage("Por favor, introduce un formato de email válido.");
      return false;
    } 

    if (!validation.isValidPassword(password)) {
      setAlertMessage("Por favor, introduce un formato de email válido.");
      return false;
    }

    if (error) {
      setAlertMessage(error);
      return false;
    } 

    return true; 
  }


  /* ----- CUERPO DEL COMPONENTE ----- */
  
  return (
  <div className={classes.container}>
    <div className={classes.login}>
      <p className={classes.accede}>Accede a tu cuenta</p>
      <p className={classes.usaGmail}>Usa tu email y contraseña</p>
      <form className={classes.formLogin} onSubmit={handleLoginData}>
          <div className={classes.contenedorEmail}>
              <input type="email" id="email" name="mail" placeholder="Email"/>
          </div>
          <div className={classes.contenedorPassword}>
              <input type="password" id="password" name="password" placeholder="Contraseña"/>
          </div>
          <button type="submit" disabled={isLoading} className={classes.acceder}>
              {isLoading ? 'Cargando...' : 'Acceder'}
          </button>
      </form>
    </div>
    <div className={classes.crearCuenta}>
      <img src="../../public/logo.svg" alt="Bushido Beans" className={classes.logoBushidoBeans} />
      <p className={classes.preguntaCuenta}>¿Aún no tienes cuenta?</p>
      <p className={classes.crearAhora}>Crea tu cuenta ahora</p>
      <button className={classes.btnCrearCuenta} value={false} onClick={() => handleViewChange}>Crear cuenta</button>
    </div>
  </div>
  );
};
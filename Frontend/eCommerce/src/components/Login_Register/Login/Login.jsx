import { useState } from "react";

import { LOGIN_URL } from "../../../endpoints/config";
import { useAuth } from "../../../context/AuthContext";
import { validation } from '../../../utils/validationForm';
import useFetchEvent from "../../../endpoints/useFetchEvent";

import classes from "./Login.module.css";


export default function Login({handleViewChange, setAlertMessage}) {
  
  /* ----- HOOKS Y CONSTS ----- */

  const {handleLogin} = useAuth();
  const {fetchingData, error, isLoading} = useFetchEvent();

  const [errors, setErrors] = useState({
    mailError: null,
    passError: null
  });

  
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
    console.log(!validation.isValidEmail(email));
    
    if (!validation.isValidEmail(email)) {
      setErrors({mailError: "Por favor, introduce un formato de email válido."});
      return false;
    } 

    if (!validation.isValidPassword(password)) {
      setErrors({passError:"Por favor, introduce un formato de contraseña válido."});
      return false;
    }

    if (error) {
      setAlertMessage(error);
      return false;
    }

    setErrors({
      mailError: null,
      passError: null
    });

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
              {errors.mailError && <p className={classes.emailMessage}>{errors.mailError}</p>}
          </div>
          <div className={classes.contenedorPassword}>
              <input type="password" id="password" name="password" placeholder="Contraseña"/>
              {errors.passError && <p className={classes.passwordMessage}>{errors.passError}</p>}
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
      <button className={classes.btnCrearCuenta} value={true} onClick={handleViewChange}>Crear cuenta</button>
    </div>
  </div>
  );
};
import { useEffect, useRef, useState } from "react";

import { LOGIN_URL } from "../../../endpoints/config";
import { useAuth } from "../../../context/AuthContext";
import useFetch from "../../../endpoints/useFetch";

import classes from "./Login.module.css";

export default function Login(handleViewChange) {
  
  /* ----- HOOKS ----- */

  const {handleLogin} = useAuth();

  const [loginData, setLoginData] = useState({
    mail: null,
    password: null
  });

  const {fetchData, error, isLoading} = useFetch({url: LOGIN_URL, type: 'POST', params:loginData});
  console.log(error);


  useEffect(() => {
    if(fetchData) handleLogin(fetchData.accessToken);
  }, [fetchData])
 

  /* ----- FUNCIONES ----- */

  function handleLoginData(event) {
    event.preventDefault();
    const form = event.target;

    setLoginData({
      mail: form.email.value,
      password: form.password.value
    });
  };


  /* ----- CUERPO DEL COMPONENTE ----- */
  
  return (
  <div className={classes.container}>
    <div className={classes.login}>
      <p className={classes.accede}>Accede a tu cuenta</p>
      <p className={classes.usaGmail}>Usa tu email y contraseña</p>
      <form className={classes.formLogin} onSubmit={handleLoginData}>
          <div className={classes.contenedorEmail}>
              <input type="email" id="email" name="mail" placeholder="Email"/>
              {error && <p className={classes.emailMessage}>{error.message}</p>} {/* Probar lo del error */}
          </div>
          <div className={classes.contenedorPassword}>
              <input type="password" id="password" name="password" placeholder="Contraseña"/>
              {error && <p className={classes.passwordMessage}>{error.message}</p>} {/* Probar lo del error aquí tambien */}
          </div>
          <button type="submit" disabled={isLoading} className={classes.acceder}>
              {isLoading ? 'Cargando...' : 'Acceder'}
          </button>
          {error && <p className={classes.errorMessage}>{error.message}</p>} {/* Lo mismo que antes */}
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
}
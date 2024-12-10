import { useEffect, useState } from "react";

import { REGISTER_URL } from "../../../endpoints/config";
import { useAuth } from "../../../context/AuthContext";
import useFetchEvent from "../../../endpoints/useFetchEvent";
import { validation } from "../../../utils/validationForm";
import Input from "../../Input/Input";

import classes from "./Register.module.css";


export default function Register({handleViewChange, setAlertMessage}) {
    
  /* ----- HOOKS Y CONSTS ----- */

  const {handleLogin} = useAuth();
  const {fetchingData, fetchError, isLoading} = useFetchEvent();

  const [errors, setErrors] = useState({
    mailError: null,
    passError: null,
    nameError: null
  });

  const [userRegister, setUserRegister] = useState({
    mail: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    address: '',
    phone: ''
  })
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  useEffect(() => {
    if (typeof fetchError === 'string') {setAlertMessage(fetchError)};

  }, [fetchError]);


  /* ----- FUNCIONES ----- */

  function handleShowPasswordRequirements(showIt) {
    setShowPasswordRequirements(showIt);
  }

  const passwordRequirements = checkPasswordRequirements(userRegister.password);

  function checkPasswordRequirements(password) {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserRegister((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  async function handleRegisterData(event) {
    event.preventDefault();
    const form = event.target;

    if(!dataValidator(form.mail.value, form.password.value, form.confirmPassword.value, form.name.value)) return;

    const registerData = {
      mail: form.mail.value,
      password: form.password.value,
      name: form.name.value,
      surname: form.name.value,
      phone: form.phone.value,
      address: form.address.value
    }; 

    console.log("form", registerData);
    
    const data = await fetchingData({url: REGISTER_URL, type: 'POST', params:registerData, needAuth:false});

    if(data) handleLogin(data.accessToken);
  };


  function dataValidator(email, password, confirmPassword, name) {
    console.log(!validation.isValidEmail(email));
    
    if (!validation.isValidEmail(email)) {
      setErrors({mailError: "Por favor, introduce un formato de email válido."});
      return false;
    } 

    if (!validation.isValidPassword(password)) {
      setErrors({passError:"Por favor, introduce un formato de contraseña válido."});
      return false;
    }

    if (password !== confirmPassword) {
      setErrors({passError: "Las contraseñas introducidasa no coinciden"})
      return false;
    }

    if (!validation.isValidName(name)) {
      setErrors({nameError: "Por favor, introduce un formato de nombre válido."});
      return false;
    }

    setErrors({
      mailError: null,
      passError: null,
      nameError: null
    });

    return true; 
  }

  return (
    <div className={classes.container_secundario}>
      <div className={`${classes.login} ${classes.login_secundario}`}>
        <img src="../../public/logo-secundario.svg" alt="Logo" className={classes.logoBushidoBeans_secundario} />
          <p className={`${classes.preguntaCuenta_secundario} ${classes.accede} subtitulo`}>¿Ya tienes cuenta?</p>
          <button className={`${classes.acceder} ${classes.acceder_secundario}`} value={false} onClick={handleViewChange}>Acceder</button>
      </div>
      <div className={classes.register}>
        <p className={`${classes.preguntaCuenta_terciario} titulo`}>Crea tu cuenta</p>
        <p className={`${classes.preguntaCuenta_terciario} titulo`}>Añade tus datos personales</p>
        <form className={classes.formRegister} onSubmit={handleRegisterData}>
          <div className={`${classes.contenedorEmail} ${classes.contenedorEmail_secundario}`}>
            <Input
              type="email"
              id="mail"
              name="mail"
              placeholder="Email"
              value={userRegister.mail}
              onChange={handleChange}
            />
            {errors.mailError && <p className={`${classes.mailMessage} ${classes.emailMessage_secundario}`}>{errors.emailError}</p>}
          </div>
          <div className={`${classes.contenedorPassword} ${classes.contenedorPassword_secundario}`}>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            onFocus={() => handleShowPasswordRequirements(true)}
            onBlur={() => handleShowPasswordRequirements(false)}
            value={userRegister.password}
            onChange={handleChange}
          />
          {errors.passError && <p className={`${classes.passwordMessage} ${classes.passwordMessage_secundario}`}>{errors.passError}</p>}
          {showPasswordRequirements && (
            <ul className={classes.password_requirements}>
              <li style={{ color: passwordRequirements.hasUpperCase ? 'var(--fondo-vistas)' : 'red' }}>
                  {passwordRequirements.hasUpperCase ? '✅' : '❌'} Al menos una mayúscula
              </li>
              <li style={{ color: passwordRequirements.hasLowerCase ? 'var(--fondo-vistas)' : 'red' }}>
                  {passwordRequirements.hasLowerCase ? '✅' : '❌'} Al menos una minúscula
              </li>
              <li style={{ color: passwordRequirements.hasNumber ? 'var(--fondo-vistas)' : 'red' }}>
                  {passwordRequirements.hasNumber ? '✅' : '❌'} Al menos un número
              </li>
              <li style={{ color: passwordRequirements.minLength ? 'var(--fondo-vistas)' : 'red' }}>
                  {passwordRequirements.minLength ? '✅' : '❌'} Mínimo 8 caracteres
              </li>
              <li style={{ color: passwordRequirements.hasSpecialChar ? 'var(--fondo-vistas)' : 'red' }}>
                  {passwordRequirements.hasSpecialChar ? '✅' : '❌'} Al menos un carácter especial
              </li>
            </ul>
          )}
          </div>
          <div className={`${classes.contenedorPassword} ${classes.contenedorPassword_secundario}`}>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Repetir Contraseña"
              value={userRegister.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className={`${classes.contenedorNombre} ${classes.contenedorEmail} ${classes.contenedorEmail_secundario}`}>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Nombre"
              value={userRegister.name}
              onChange={handleChange}
            />
            {errors.nameError && <p className={`${classes.nameMessage} ${classes.emailMessage} ${classes.emailMessage_secundario}`}>{errors.nameError}</p>}
          </div>
          <div className={`${classes.contenedorPassword} ${classes.contenedorPassword_secundario}`}>
            <Input
              type="text"
              id="surname"
              name="surname"
              placeholder="Introduce tu apellido"
              value={userRegister.surname}
              onChange={handleChange}
            />
          </div>
          <div className={`${classes.contenedorPassword} ${classes.contenedorPassword_secundario}`}>
            <Input
              type="text"
              id="phone"
              name="phone"
              placeholder="Introduce tu número de teléfono"
              value={userRegister.phone}
              onChange={handleChange}
            />
          </div>
          <div className={`${classes.contenedorPassword} ${classes.contenedorPassword_secundario}`}>
            <Input
              type="text"
              id="address"
              name="address"
              placeholder="Introduce tu dirección"
              value={userRegister.address}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={isLoading} className={`${classes.btnCrearCuenta} ${classes.btnCrearCuenta_secundario}`}>
              {isLoading ? 'Cargando...' : 'Crear Cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
}
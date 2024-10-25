import './Login.css';
import { useRef, useState } from "react";
import logo from "../../public/recursos/logo.svg";
import { validation } from '../utils/validationForm';
// import jwt_decode from "jwt-decode"; // Asegúrate de tener instalada la librería jwt-decode

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [promesaError, setPromesaError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Cambia null a false para indicar que no se está cargando.

    const handleAcceder = (event) => {
        event.preventDefault();

        const emailValue = emailRef.current.value; // Almacena el valor del email
        if (!validation.isValidEmail(emailValue)) {
            setEmailError("Por favor, introduce un formato de email válido."); 
            return;
        } else {
            setEmailError(null);
        }

        const passwordValue = passwordRef.current.value; // Almacena el valor de la contraseña
        if (!validation.isValidPassword(passwordValue)) {
            setPasswordError("Por favor, introduce una contraseña válida."); 
            return;
        } else {
            setPasswordError(null);
        }

        const objetoBackend = {
            email: emailValue,
            password: passwordValue,
        };
        console.log(objetoBackend);

        // Aquí puedes agregar la lógica para manejar el inicio de sesión
    };

    return (
        <div className='container'>
            <div className='login'>
                <p className='accede'>Accede a tu cuenta</p>
                <p className='usaGmail'>Usa tu email y contraseña</p>
                <form className='formLogin' onSubmit={handleAcceder}>
                    <div className='contenedorEmail'>
                        <label htmlFor="email" />
                        <input type="email" name="email" id="email" ref={emailRef} placeholder='Email' />
                        {emailError && <p className="email-message">{emailError}</p>}
                    </div>
                    <div className='contenedorPassword'>
                        <label htmlFor="password" />
                        <input type="password" name="password" id="password" ref={passwordRef} placeholder='Contraseña' />
                        {passwordError && <p className="password-message">{passwordError}</p>}
                    </div>
                    <button type="submit" disabled={isLoading} className='Acceder'>
                        {isLoading ? 'Cargando...' : 'Acceder'}
                    </button>
                </form>
            </div>
            <div className='crearCuenta'>
                <img src={logo} alt="Bushido Beans" className='logoBushidoBeans' />
                <p className='preguntaCuenta'>¿Aún no tienes cuenta?</p>
                <p className='crearAhora'>Crea tu cuenta ahora</p>
                <button className='btnCrearCuenta'>Crear cuenta</button>
            </div>
        </div>
    );
}

export default Login;

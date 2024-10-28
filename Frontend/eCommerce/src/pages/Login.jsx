// import jwt_decode from 'jwt-decode';
import "../styles/login.css"
import { useRef, useState } from "react";
import logo from "../../public/logo.svg";
import { validation } from '../utils/validationForm';
import { useNavigate } from 'react-router-dom';

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [promesaError, setPromesaError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleCrearCuenta = () =>{
        navigate('/register');
    }
    const fetchingData = async (url, data) => {
        // try {
        //     setIsLoading(true);
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     });

        //     if (response.ok) {
        //         const dataPromesa = await response.json();
        //         const token = dataPromesa.token;
        //         const decoded = jwt_decode(token);

        //         if (decoded) {
        //             const userInfo = {
        //                 nombre: decoded.username,
        //                 email: decoded.email,
        //                 rol: decoded.rol   
        //             };
        //             console.log(userInfo);
        //         }

        //         setPromesaError(null);
        //     } else {
        //         setPromesaError("Error en la autenticacion: " + response.statusText);
        //     }
        // } catch (error) {
        //     setPromesaError("Error en la autenticacion: " + error.message);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    const handleAcceder = async (event) => {
        event.preventDefault();

        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;

        if (!validation.isValidEmail(emailValue)) {
            setEmailError("Por favor, introduce un formato de email válido.");
            return;
        } else {
            setEmailError(null);
        }

        if (!validation.isValidPassword(passwordValue)) {
            setPasswordError("Por favor, introduce un formato de contraseña válido.");
            return;
        } else {
            setPasswordError(null);
        }

        const objetoBackend = {
            email: emailValue,
            password: passwordValue,
        };
        console.log(objetoBackend);

        //await fetchingData("URL_API_AQUI", objetoBackend);
        
        resetForm();
    };

    function resetForm() {
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }

    return (
        <body>
        <div className='container body'>
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
                    {promesaError && <p className="error-message">{promesaError}</p>}
                </form>
            </div>
            <div className='crearCuenta'>
                <img src={logo} alt="Bushido Beans" className='logoBushidoBeans' />
                <p className='preguntaCuenta'>¿Aún no tienes cuenta?</p>
                <p className='crearAhora'>Crea tu cuenta ahora</p>
                <button className='btnCrearCuenta' onClick={handleCrearCuenta}>Crear cuenta</button>
            </div>
        </div>
        </body>
    );
}

export default Login;

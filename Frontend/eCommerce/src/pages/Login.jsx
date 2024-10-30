import * as jwt_decode from 'jwt-decode';
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
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const dataPromesa = await response.json();
                console.log("dataPromesa",dataPromesa);
                const token = dataPromesa.accessToken;
                console.log("token", token);
                const decoded = jwt_decode.jwtDecode(token);
                console.log("decoded", decoded);

                if (decoded) {
                    const userInfo = {
                        Mail: decoded.email,
                        Admin: decoded.rol   
                    };
                    console.log(userInfo);
                }

                setPromesaError(null);
            } else {
                setPromesaError((await response.text()).toString);
            }
        } catch (error) {
            setPromesaError(error.message);
        } finally {
            setIsLoading(false);
        }
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
            Mail: emailValue,
            Password: passwordValue,
        };
        console.log(objetoBackend);

        await fetchingData("https://localhost:7015/api/Auth", objetoBackend);
        alert("Te has logeado👍.")
        resetForm();
        navigate('/');
    };

    function resetForm() {
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }

    return (
    <div className="container-supremo">
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
    </div>
    );
}

export default Login;

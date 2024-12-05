import * as jwt_decode from 'jwt-decode';
import "../styles/login.css";
import { useRef, useState } from "react";
import { validation } from '../utils/validationForm';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from './../components/Alerta';
import { useAuth } from '../context/AuthContext';
import { LOGIN_URL } from '../endpoints/config';

function Login() {
    const {login} = useAuth;
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [promesaError, setPromesaError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const {location} = useLocation();

    const navigate = useNavigate();

    const handleCrearCuenta = () => navigate('/register');
    const handleLogoClick = () => navigate('/'); 

    const fetchingData = async (url, data) => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const { accessToken } = await response.json();
                const { email, rol: admin } = jwt_decode.jwtDecode(accessToken);
                console.log({ email, admin });
                setAlertMessage("Te has logeado correctamente!");
                login(accessToken);
                resetForm();

                const previousPath = location.state?.page || "/";
                navigate(previousPath);
            }
             else {
                setPromesaError(await response.text());
                setAlertMessage("Error: Credenciales incorrectas.");
            }
        } catch (error) {
            setPromesaError(error.message);
            setAlertMessage("Error: Problema de conexión.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAcceder = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!validation.isValidEmail(email)) {
            setEmailError("Por favor, introduce un formato de email válido.");
            return;
        }
        setEmailError(null);

        if (!validation.isValidPassword(password)) {
            setPasswordError("Por favor, introduce un formato de contraseña válido.");
            return;
        }
        setPasswordError(null);

        await fetchingData(LOGIN_URL, { Mail: email, Password: password });
    };

    const resetForm = () => {
        emailRef.current.value = "";
        passwordRef.current.value = "";
    };

    return (
        <div className="container-supremo">
            <div className="container">
                <div className="login">
                    <p className="accede">Accede a tu cuenta</p>
                    <p className="usaGmail">Usa tu email y contraseña</p>
                    <form className="formLogin" onSubmit={handleAcceder}>
                        <div className="contenedorEmail">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                ref={emailRef}
                                placeholder="Email"
                            />
                            {emailError && <p className="email-message">{emailError}</p>}
                        </div>
                        <div className="contenedorPassword">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                ref={passwordRef}
                                placeholder="Contraseña"
                            />
                            {passwordError && <p className="password-message">{passwordError}</p>}
                        </div>
                        <button type="submit" disabled={isLoading} className="Acceder">
                            {isLoading ? 'Cargando...' : 'Acceder'}
                        </button>
                        {promesaError && <p className="error-message">{promesaError}</p>}
                    </form>
                </div>
                <div className="crearCuenta">
                    <button onClick={handleLogoClick} className='logo-button'><img src="../../public/logo.svg" alt="Bushido Beans" className="logoBushidoBeans" /></button>
                    <p className="preguntaCuenta">¿Aún no tienes cuenta?</p>
                    <p className="crearAhora">Crea tu cuenta ahora</p>
                    <button className="btnCrearCuenta" onClick={handleCrearCuenta}>Crear cuenta</button>
                </div>
                {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}
            </div>
        </div>
    );
}

export default Login;
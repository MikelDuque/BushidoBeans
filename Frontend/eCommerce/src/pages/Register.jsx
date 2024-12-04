import React, { useRef, useState } from 'react';
import '../styles/register.css';
import { validation } from '../utils/validationForm';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';
import Alert from './../components/Alerta';
import Input from '../components/Input';
import { REGISTER_URL } from '../endpoints/config';

function Register() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const nameRef = useRef(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [password, setPassword] = useState('');
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false); // Estado para mostrar los requisitos
    const navigate = useNavigate();

    
    
    const handleAcceder = () => navigate('/login');
    const handleLogoClick = () => navigate('/'); 

    const handleRegister = async (event) => {
        event.preventDefault();
        const RegisterRef = ([{
            mail: emailRef.current.value,
            name: nameRef.current.value,
            surname: nameRef.current.value,
            password: passwordRef.current.value,  
          }]);
      
          console.log("hola", RegisterRef);
        
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const name = nameRef.current.value;

        if (!validation.isValidEmail(email)) {
            setEmailError("Por favor, introduce un formato de email válido.");
            return;
        }
        setEmailError(null);

        if (!validation.isValidName(name)) {
            setNameError("Por favor, introduce un formato de nombre válido.");
            return;
        }
        setNameError(null);

        if (!validation.isValidPassword(password)) {
            setPasswordError("Por favor, introduce un formato de contraseña válido.");
            return;
        }
        setPasswordError(null);

        if (password !== confirmPassword) {
            setPasswordError("Las contraseñas no coinciden.");
            return;
        }


        await registerUser({ Name: name, Mail: email, Password: password });
        console.log("usuario rergister", registerUser);
        
    };

    const registerUser = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const accessToken = await response.json();
                localStorage.setItem('accessToken', accessToken)
                const decoded = jwt_decode.jwtDecode(accessToken);
                console.log({ email: decoded.email, name: decoded.name });
                setAlertMessage("Te has registrado correctamente!");
                resetForm();
                navigate('/');
            } else {
                const errorText = await response.text();
                console.error(errorText);
                setAlertMessage("Error al registrarse: " + errorText);
            }
        } catch (error) {
            console.error("Error en la autenticación:", error.message);
            setAlertMessage("Error: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
        nameRef.current.value = "";
    };

    // Manejador para mostrar los requisitos
    const handleShowPasswordRequirements = () => {
        setShowPasswordRequirements(true);
    };

    // Manejador para ocultar los requisitos
    const handleHidePasswordRequirements = () => {
        setShowPasswordRequirements(false);
    };
    
    // Verificar requisitos de la contraseña
    const checkPasswordRequirements = (password) => {
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

    const passwordRequirements = checkPasswordRequirements(password);

    return (
        <div className="container-supremo">
            <div className="container-secundario">
                <div className="login login-secundario">
                    <button onClick={handleLogoClick} className='logo-button-secundario'><img src="../../public/logo-secundario.svg" alt="Logo" className="logoBushidoBeans-secundario" /></button>
                    <p className="preguntaCuenta-secundario accede">¿Ya tienes cuenta?</p>
                    <button className="Acceder Acceder-secundario" onClick={handleAcceder}>Acceder</button>
                </div>
                <div className="register">
                    <p className="preguntaCuenta-terciario">Crea tu cuenta</p>
                    <p className="preguntaCuenta-terciario">Añade tus datos personales</p>
                    <form className="formRegister" onSubmit={handleRegister}>
                        <div className="contenedorNombre contenedorEmail contenedorEmail-secundario">
                            <Input type="text" name="name" id="name" ref={nameRef} placeholder="Nombre" className="nombre" />
                            {nameError && <p className="name-message email-message email-message-secundario ">{nameError}</p>}
                        </div>
                        <div className="contenedorEmail contenedorEmail-secundario">
                            <Input type="email" id="email" name="email" ref={emailRef} placeholder="Email" />
                            {emailError && <p className="email-message email-message-secundario">{emailError}</p>}
                        </div>
                        <div className="contenedorPassword contenedorPassword-secundario">
                            <Input 
                                type="password" 
                                id="password" 
                                name="password" 
                                ref={passwordRef} 
                                placeholder="Contraseña" 
                                onFocus={handleShowPasswordRequirements} 
                                onBlur={handleHidePasswordRequirements} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
                            />
                            {passwordError && <p className="password-message password-message-secundario">{passwordError}</p>}
                            {showPasswordRequirements && (
                                <ul className="password-requirements">
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
                        <div className="contenedorPassword contenedorPassword-secundario">
                            <Input type="password" id="confirmPassword" name="confirmPassword" ref={confirmPasswordRef} placeholder="Repetir Contraseña" />
                        </div>
                        <button type="submit" disabled={isLoading} className="btnCrearCuenta btnCrearCuenta-secundario">
                            {isLoading ? 'Cargando...' : 'Crear Cuenta'}
                        </button>
                    </form>
                </div>
                {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}
            </div>
        </div>
    );
}

export default Register;

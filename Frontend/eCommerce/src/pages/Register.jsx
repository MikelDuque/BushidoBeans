import logo from '../../public/logo-secundario.svg';
import React, { useRef, useState } from 'react';
import '../styles/Register.css'; 
import { validation } from '../utils/validationForm';
import { useNavigate } from 'react-router-dom';


function Register() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef  = useRef(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const navigate = useNavigate();

    const handleAcceder = () =>{
        navigate('/');
    }
    const handleRegister = (event) => {
        event.preventDefault();
        
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;
        const nameValue = nameRef.current.value;

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
            name: nameValue,
            email: emailValue,
            password: passwordValue,
        };
        console.log(objetoBackend);

        // Resetea el formulario después de enviar
        resetForm();
    };

    function resetForm() {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        nameRef.current.value = "";
    }

    return (
        <div className='container'>
            
            <div className='login-secundario'>
                <img src={logo} alt="" className='logoBushidoBeans-secundario'/>
                <p className='preguntaCuenta-secundaria'>¿Ya tienes cuenta?</p>
                <p className='registrarseTexto'>Registrate de nuevo</p>
                <button className='Acceder' onClick={handleAcceder}>Acceder</button>
            </div>
            <div className='register'>
                <p className='preguntaCuenta'>Crea tu cuenta</p>
                <p className='preguntaCuenta'>Añade tus datos personales</p>
                <form className='formRegister' onSubmit={handleRegister}>
                    <div className='contenedorNombre'>
                        <label htmlFor="name" />
                        <input type="text" name="name" id="name" ref={nameRef} placeholder='Nombre' />
                    </div>
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
                    <button type="submit" className='Registrarse'>Registrarse</button>
                </form>
            </div>
        </div>
    );
}

export default Register;

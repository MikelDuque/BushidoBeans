import logo from '../../public/logo-secundario.svg';
import React, { useRef, useState } from 'react';
import '../styles/register.css'; 
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
        navigate('/login');
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
        <body>
        <div className='container container-secundario'>
            <div className='login-secundario'>
                <img src={logo} alt="" className='logoBushidoBeans-secundario'/>
                <p className='preguntaCuenta-secundario accede'>¿Ya tienes cuenta?</p>
                <p className='registrarseTexto accede'>Registrese de nuevo</p>
                <button className='Acceder Acceder-secundario' onClick={handleAcceder}>Acceder</button>
            </div>



            <div className='register'>
                <p className='preguntaCuenta preguntaCuenta-terciario-uno'>Crea tu cuenta</p>
                <p className='preguntaCuenta preguntaCuenta-terciario-dos'>Añade tus datos personales</p>
                <form className='formRegister' onSubmit={handleRegister}>
                    <div className='contenedorNombre contenedorEmail contenedorEmail-secundario'>
                        <label htmlFor="name" />
                        <input type="text" name="name" id="email" ref={nameRef} placeholder='Nombre' />
                    </div>
                    <div className='contenedorEmail contenedorEmail-secundario'>
                        <label htmlFor="email" />
                        <input type="email" name="email" id="email" ref={emailRef} placeholder='Email' />
                        {emailError && <p className="email-message email-message-secundario ">{emailError}</p>}
                    </div>
                    <div className='contenedorPassword contenedorPassword-secundario'>
                        <label htmlFor="password" />
                        <input type="password" name="password" id="password" ref={passwordRef} placeholder='Contraseña' />
                        {passwordError && <p className="password-message password-message-secundario">{passwordError}</p>}
                    </div>
                    <div className='CrearCuenta'><button type="submit" className='btnCrearCuenta btnCrearCuenta-secundario'>Crear Cuenta</button></div>
                </form>
            </div>
        </div>
        </body>
    );
}

export default Register;

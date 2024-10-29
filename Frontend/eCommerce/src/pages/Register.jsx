import logo from '../../public/logo-secundario.svg';
import React, { useReducer, useRef, useState } from 'react';
import '../styles/register.css'; 
import { validation } from '../utils/validationForm';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

function Register() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmacionRef = useRef(null)
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
        const confirmacionValue = confirmacionRef.current.value;
        const nameValue = nameRef.current.value;
        const comprobarPassword = () =>{return passwordValue === confirmacionValue;}
        if (!validation.isValidEmail(emailValue)) {
            setEmailError("Por favor, introduce un formato de email válido.");
            return;
        } else {
            setEmailError(null);
        }

        if (!validation.isValidPassword(passwordValue)) {
            setPasswordError("Por favor, introduce un formato de contraseña válido.");   
            return;
        } 
        else {
            setPasswordError(null);
        }
        //No funciona, no comprueba bien las contraseñas
        if(comprobarPassword){
            const objetoBackend = {
                Name: nameValue,
                Mail: emailValue,
                Password: passwordValue,
            };
            console.log(objetoBackend);
            fetchingData("https://localhost:7015/api/User", objetoBackend);
            alert("Te has registrado👍👍.")
            navigate('/');       
            resetForm();
        }else{
            alert("Las contraseñas no coinciden.")
        }

    };

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
                        Password: decoded.password,
                        Name: decoded.name   
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

    function resetForm() {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        nameRef.current.value = "";
    }

    return (
        <div className='container-supremo'>
        <div className='container-secundario'>
            <div className='login login-secundario'>
                <img src={logo} alt="" className='logoBushidoBeans-secundario'/>
                <p className='preguntaCuenta-secundario accede'>¿Ya tienes cuenta?</p>
                <p className='registrarseTexto accede'>Registrese de nuevo</p>
                <button className='Acceder Acceder-secundario' onClick={handleAcceder}>Acceder</button>
            </div>



            <div className='register'>
                <p className='preguntaCuenta-terciario'>Crea tu cuenta</p>
                <p className='preguntaCuenta-terciario'>Añade tus datos personales</p>
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
                    <div className='contenedorPassword contenedorPassword-secundario'>
                        <label htmlFor="password" />
                        <input type="password" name="password" id="password" ref={confirmacionRef} placeholder='Repetir Contraseña' />
                        {passwordError && <p className="password-message password-message-secundario">{passwordError}</p>}
                    </div>
                    <div className='CrearCuenta'><button type="submit" className='btnCrearCuenta btnCrearCuenta-secundario'>Crear Cuenta</button></div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Register;


import './Login.css'
import { useRef, useState } from "react";
import logo from "../../public/recursos/logo.svg"
// import jwt_decode from "jwt-decode"; // asegúrate de tener instalada la librería jwt-decode

function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [promesaError, setPromesaError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    

    return(
        <div className='container'>
        <div className='login'>
            <p className='accede'>Accede a tu cuenta</p>
            <p className='usaGmail'>Usa tu Gmail y contraseña</p>
            <form className='formLogin' >
                <div className='contenedorEmail'>
                    <label htmlFor="email"/>
                    <input type="email" name="email" id="email" ref={emailRef} placeholder='Email'/>
                </div>
                <div className='contenedorPassword'>
                    <label htmlFor="text"/>
                    <input type="text" name="password" id="password" ref={passwordRef} placeholder='Contraseña'/>
                </div>
            </form>
            <button className='Acceder' >Acceder</button>
        </div>
        <div className='crearCuenta'>
            <img src={logo} alt="Bushido Beans" className='logoBushidoBeans' />
            <p className='preguntaCuenta'>¿Aun no tienes cuenta?</p>
            <p className='crearAhora'>Crea tu cuenta ahora</p>
            <button className='btnCrearCuenta'>Crear cuenta</button>
        </div>
        </div>
    )
}

export default Login;
import './Login.css'
import { useRef, useState } from "react";
// import jwt_decode from "jwt-decode"; // asegúrate de tener instalada la librería jwt-decode

function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    return(
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
    )
}

export default Login;
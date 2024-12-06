import { useState } from 'react';
import '../styles/register.css';
import { validation } from '../utils/validationForm';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';
import Alert from './../components/Alert/Alert';
import Input from '../components/Input';
import { REGISTER_URL } from '../endpoints/config';
import { useAuth } from '../context/AuthContext';

function Register() {
    const {login} = useAuth();
    
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [password, setPassword] = useState('');
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
    const [userRegister, setUserRegister] = useState({
        mail: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
        address: '',
        phone: '',
    });
    


    const navigate = useNavigate();

    const handleAcceder = () => navigate('/login');
    const handleLogoClick = () => navigate('/');

    const handleRegister = async (event) => {
        event.preventDefault();

        const { mail, password, confirmPassword, name } = userRegister;

        if (!validation.isValidEmail(mail)) {
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

        await registerUser(userRegister);
    };
    

    const registerUser = async () => {
        const { confirmPassword, ...userDataToSend } = userRegister;
        console.log("user:", userDataToSend);
        
        setIsLoading(true);
        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(userDataToSend),
            });

            if (response.ok) {
                const { accessToken } = await response.json();
                localStorage.setItem('accessToken', accessToken)
                const { email, rol: admin } = jwt_decode.jwtDecode(accessToken);
                login(accessToken);
                console.log({ email, admin });
                setAlertMessage("Te has registrado correctamente!");

                const previousPath = location.state?.page || "/";
                navigate(previousPath);
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
        setUserRegister({
            mail: '',
            password: '',
            confirmPassword: '',
            name: '',
            surname: '',
            address: '',
            phone: '',
        });
    };

    const handleShowPasswordRequirements = () => {
        setShowPasswordRequirements(true);
    };

    const handleHidePasswordRequirements = () => {
        setShowPasswordRequirements(false);
    };

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserRegister((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container-supremo">
            <div className="container-secundario">
                <div className="login login-secundario">
                    <button onClick={handleLogoClick} className='logo-button-secundario'>
                        <img src="../../public/logo-secundario.svg" alt="Logo" className="logoBushidoBeans-secundario" />
                    </button>
                    <p className="preguntaCuenta-secundario accede">¿Ya tienes cuenta?</p>
                    <button className="Acceder Acceder-secundario" onClick={handleAcceder}>Acceder</button>
                </div>
                <div className="register">
                    <p className="preguntaCuenta-terciario">Crea tu cuenta</p>
                    <p className="preguntaCuenta-terciario">Añade tus datos personales</p>
                    <form className="formRegister" onSubmit={handleRegister}>
                        <div className="contenedorNombre contenedorEmail contenedorEmail-secundario">
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nombre"
                                value={userRegister.name}
                                onChange={handleChange}
                            />
                            {nameError && <p className="name-message email-message email-message-secundario ">{nameError}</p>}
                        </div>
                        <div className="contenedorEmail contenedorEmail-secundario">
                            <Input
                                type="email"
                                id="mail"
                                name="mail"
                                placeholder="Email"
                                value={userRegister.mail}
                                onChange={handleChange}
                            />
                            {emailError && <p className="email-message email-message-secundario">{emailError}</p>}
                        </div>
                        <div className="contenedorPassword contenedorPassword-secundario">
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                onFocus={handleShowPasswordRequirements}
                                onBlur={handleHidePasswordRequirements}
                                value={userRegister.password}
                                onChange={handleChange}
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
                            <Input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Repetir Contraseña"
                                value={userRegister.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="contenedorPassword contenedorPassword-secundario">
                            <Input
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder="Introduce tu apellido"
                                value={userRegister.surname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="contenedorPassword contenedorPassword-secundario">
                            <Input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Introduce tu dirección"
                                value={userRegister.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="contenedorPassword contenedorPassword-secundario">
                            <Input
                                type="number"
                                id="phone"
                                name="phone"
                                placeholder="Introduce tu número de teléfono"
                                value={userRegister.phone}
                                onChange={handleChange}
                            />
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

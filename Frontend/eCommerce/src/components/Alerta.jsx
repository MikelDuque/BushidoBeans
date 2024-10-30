import React, { useEffect } from 'react';
import '../styles/alerta.css';

const Alert = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // Oculta la alerta después de 3 segundos
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="alert">
            <p>{message}</p>
        </div>
    );
};

export default Alert;
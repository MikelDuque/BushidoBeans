import React, { useState, useEffect } from 'react';
import "../styles/catalogoIntro.css"
import "../styles/carruselPrueba.css"

const Dropdown = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleChange2 = (event) => {
        setSelectedOption2(event.target.value);
    };

    return (
        <>
        <div className='botonFiltroG'>
            <label htmlFor="select-product">Mostrar...</label>
            <select id="select-product" value={selectedOption} onChange={handleChange}>
                <option value="opcion1">Café</option>
                <option value="opcion2">Té</option>
                <option value="opcion3">Todos los producto</option>
            </select>
            
        </div>
        <div className='botonFiltroG'>
        <label htmlFor="select-product">Ordenar por...</label>
        <select id="select-product" value={selectedOption2} onChange={handleChange2}>
            <option value="opcion1">Precio</option>
            <option value="opcion2">Fecha</option>
            <option value="opcion3">Nombre</option>
        </select>
        
    </div>
    </>
    );
};

const Carrusel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const items = [
        { id: 1, image: 'recursos/imgCarrusel1.png' },
        { id: 2, image: 'recursos/imgCarrusel2.jpg' },
        { id: 3, image: 'recursos/imgCarrusel3.jpg' },
        { id: 4, image: 'recursos/imgCarrusel4.jpg' },
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    // Cambiar automáticamente cada 3 segundos
    useEffect(() => {
        const interval = setInterval(handleNext, 3000);
        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, []);

    return (
        <div className="carrusel">
            <div className="carrusel-item">
                <img src={items[currentIndex].image} alt={items[currentIndex].title} />
                <h2>{items[currentIndex].title}</h2>
            </div>
            <button onClick={handleNext}></button>
        </div>
    );
};


function CatalogoIntro(){
    return(
        <>
        <Carrusel />
        <div className='filtrosProducts'>
            
            <Dropdown /> 
        </div>
        </>
    );
    
}

export default CatalogoIntro;
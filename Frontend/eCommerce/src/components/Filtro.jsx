import { useState } from 'react';
import '../styles/Filtro.css';


const Filtro = ({ options, label, onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        onChange(event.target.value);
    };

    return (
        <div className='botonFiltroG'>
            <label>{label}</label>
            <select value={selectedOption} onChange={handleChange}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};


export default Filtro;

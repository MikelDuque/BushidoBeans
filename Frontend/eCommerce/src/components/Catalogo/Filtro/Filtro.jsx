import { useState } from 'react';
import './Filtro.css';


const Filtro = ({ options, label, onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        onChange(event.target.value);
    };

    return (
        <div className='botonFiltroG'>
            <label className='titulo'>{label}</label>
            <select className="titulo" value={selectedOption} onChange={handleChange}>
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

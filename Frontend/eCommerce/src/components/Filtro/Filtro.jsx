import { useState } from 'react';
import classes from './Filtro.module.css';



const Filtro = ({ options, label, onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        onChange(event.target.value);
    };

    return (
        <div className={classes.botonFiltroG}>
            <label className={classes.titulo}>{label}</label>
            <select className={classes.titulo} value={selectedOption} onChange={handleChange}>
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

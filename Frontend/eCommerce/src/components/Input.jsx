import "./../styles/Input.css"

function Input({ type, name, id, ref, placeholder, value, onChange, onFocus, onBlur }) {
    return (
        <input
            type={type}
            name={name}
            id={id}
            ref={ref}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
}

export default Input;

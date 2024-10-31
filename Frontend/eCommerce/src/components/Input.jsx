import "./../styles/Input.css"

function Input(type, name, id, inputRef, placeholder){
    return(
        <input
            type={type}
            name={name}
            id={id}
            ref={inputRef}
            placeholder={placeholder}
        />
    )

}
export default Input;
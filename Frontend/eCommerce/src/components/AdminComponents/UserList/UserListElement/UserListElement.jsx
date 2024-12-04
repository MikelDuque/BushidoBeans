import classes from "./UserListElement.module.css"

export default function UserListElement({listElement, changeRol, deleteUser}) {
  const fullName = `${listElement.name} ${listElement.surname}`;
  const role = listElement.role != null ? listElement.role : "usuario";

  return(
    <div className={classes.element_container}>
      <div className={classes.data_container}>
        <h2>Usuario: {listElement.id}</h2>
        <div className={classes.data}>
          <span className={classes.name}>{fullName.length < 25 ? fullName : `${fullName.substring(0, 24)}...`}</span>
          <span>Mail: {listElement.mail}</span>
          <span>Teléfono: {listElement.phone}</span>
          <span>Rol: {role}</span>
        </div>
      </div>

      <form className={classes.button_container}>
        <select id={listElement.id} name='role' defaultValue={role} onChange={changeRol}>
          <option value={null}>usuario</option>
          <option value="admin">admin</option>
        </select>
        <a id={listElement.id} onClick={deleteUser}>Eliminar</a>
      </form>
      
    </div>
  )
}
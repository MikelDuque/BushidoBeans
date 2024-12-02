import classes from "./SwitchButton.module.css";

export default function SwitchButton({setView}) {
  
  return (
    <div className={classes.container}>
      <h4 className={classes.text}>Administrar...</h4>
      <div className={classes.button_container}>
        <button className={classes.switch_button} onClick={() => setView(false)}>Productos</button>
        <button className={classes.switch_button} onClick={() => setView(true)}>Usuarios</button>
      </div>
    </div>
  );
};


import classes from "./Modal.module.css"
import { createPortal } from "react-dom"

export default function Modal({modalEvent, type, titulo, children, continueFnc, cancelFnc, continueVal, cancelVal}) {
  return createPortal(
    <>
    <div className={`${classes.modal} ${classes[`modal--${type}`]}`}>
      <div className={`${classes.headerContainer} ${classes.text}`}>
        <h4>{titulo}Tu carro</h4>
        <a className={`${classes.closeButton}`} onClick={modalEvent}>X</a>
      </div>
      <div className={classes.content}>{children}</div>
      <div className={`${classes.buttonContainer} ${classes.text}`}>
        <button className={classes.text} onClick={continueFnc}>{continueVal}Continue</button>
        <button className={classes.text} onClick={cancelFnc}>{cancelVal}Cancel</button>
      </div>
    </div>
    <div className={classes.overlay} onClick={modalEvent}/>
    </>,
    document.getElementById("root")
  );
};
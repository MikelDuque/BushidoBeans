import { useModal } from "../../context/ModalContext";
import classes from "./Modal.module.css"
import { createPortal } from "react-dom"

export default function Modal({continueFnc, cancelFnc, type, titulo, buttonValues, children}) {
const {closeModal} = useModal();

  return createPortal(
    <>
    <div className={classes.screen_container}>
    <div className={`${classes.modal} ${classes[`modal--${type}`]}`}>
      <div className={`${classes.headerContainer} ${classes.text}`}>
        <h4>{titulo}</h4>
        <a className={`${classes.closeButton}`} onClick={closeModal}>X</a>
      </div>
      <div className={classes.content}>{children}</div>
      <div className={`${classes.buttonContainer} ${classes.text}`}>
        <button className={classes.text} onClick={()=> {continueFnc(); closeModal();}}>{buttonValues.continueVal}</button>
        <button className={classes.text} onClick={cancelFnc}>{buttonValues.cancelVal}</button>
      </div>
    </div>
    <div className={classes.overlay} onClick={closeModal}/>
    </div>
    </>,
    document.getElementById("modal")
  );
};
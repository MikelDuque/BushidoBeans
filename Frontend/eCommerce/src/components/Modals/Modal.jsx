import { useModal } from "../../context/ModalContext";
import classes from "./Modal.module.css"
import { createPortal } from "react-dom"

export default function Modal({continueFnc, cancelFnc, type, titulo, buttonValues, children}) {
const {closeModal, whichIsOpen} = useModal();

  return createPortal(
    (whichIsOpen === type) && (
      <div className={classes.screen_container}>
      <div className={`${classes.modal} ${classes[`modal--${type}`]}`}>
        <div className={`${classes.headerContainer} ${classes.importantText}`}>
          <h4>{titulo}</h4>
          <a className={`${classes.closeButton}`} onClick={closeModal}>X</a>
        </div>
        <div className={classes.content}>{children}</div>
        {(buttonValues !== null) && (
          <div className={`${classes.buttonContainer} ${classes.importantText}`}>
          <button className={`${classes.importantText} ${classes.button} ${classes[`confirmBtn--${type}`]}`} onClick={()=> {continueFnc(), closeModal()}}>{buttonValues.continueVal}</button>
          <button className={`${classes.importantText} ${classes.button} ${classes[`cancelBtn--${type}`]}`} onClick={cancelFnc}>{buttonValues.cancelVal}</button>
        </div>
        )}
      </div>
      <div className={classes.overlay} onClick={closeModal}/>
      </div>
    ),
    document.getElementById("modal")
  );
};
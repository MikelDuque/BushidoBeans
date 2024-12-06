import { useState } from "react";

import Login from "../../components/Login_Register/Login/Login";
import Register from "../../components/Login_Register/Register/Register";
import Alert from "../../components/Alert/Alert";

import classes from "./Login_Register.module.css";



export default function Login_Register() {
  const [wannaLogin, setWannaLogin] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  console.log(alertMessage);
  

  function handleViewChange(event) {
    setWannaLogin(event.target.value)
  }
  
  return(
    <div className={classes.container_supremo}>
      {wannaLogin ? <Login handleViewChange={handleViewChange} setAlertMessage={setAlertMessage}/> : <Register handleViewChange={handleViewChange} alertMessage={setAlertMessage}/>}
      {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}
    </div>
  );
};
import { useState } from "react";

import Login from "../../components/Login_Register/Login/Login";
import Register from "../../components/Login_Register/Register/Register";
import Alert from "../../components/Alert/Alert";

import classes from "./Login_Register.module.css";

export default function Login_Register() {
  const [wannaLogin, setWannaLogin] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);

  function handleLoginView() {setWannaLogin(true)}
  function handleRegisterView() {setWannaLogin(false)}
  
  return(
    <div className={classes.container_supremo}>
      {wannaLogin ? <Login handleViewChange={handleRegisterView} setAlertMessage={setAlertMessage}/> : <Register handleViewChange={handleLoginView} alertMessage={setAlertMessage}/>}
      <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />
    </div>
  );
};
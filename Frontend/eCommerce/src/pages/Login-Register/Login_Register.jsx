import { useState } from "react";
import classes from "./Login_Register.module.css";
import Login from "../../components/Login_Register/Login/Login";
import Register from "../../components/Login_Register/Register/Register";

export default function Login_Register() {
  const [haveAccount, setHaveAccount] = useState(true);

  function handleViewChange(event) {
    const doesHaveAccount = event.target.value;
    console.log(doesHaveAccount);
    setHaveAccount()
  }
  
  return(
    <div className={classes.container_supremo}>
      {haveAccount ? <Login handleViewChange={handleViewChange}/> : <Register handleViewChange={handleViewChange}/>}
    </div>
  );
};
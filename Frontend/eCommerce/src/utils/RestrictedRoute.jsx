import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPrivateRoute({children}) {
  const {token} = useAuth();

  if (token) {
    const previousPath = location.pathname === "" ? "/" : location.pathname;

    return <Navigate to="/" state={{page: previousPath}} replace/>
  }

  return children;
}

export function LogoutPrivateRoute({children}) {
  const {token} = useAuth();
  const location = useLocation();
  
  if(!token) {
    const previousPath = location.pathname === "" ? "/" : location.pathname;

    return <Navigate to="/login_register" state={{page: previousPath}} replace/>
  }

  return children
}

export function AdminPrivateRoute({children}) {
  const {token, decodedToken} = useAuth();
  const location = useLocation();
  
  if(!token) {
    const previousPath = location.pathname === "/login_register" ? "/" : location.pathname;

    return <Navigate to="/login_register" state={{page: previousPath}} replace/>
  }
  
  if(decodedToken.role !== "admin") return(<Navigate to="/" replace/>)

  return children
}
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export function LogoutPrivateRoute({children}) {
  const {token} = useAuth();
  const location = useLocation();
  
  if(!token) {
    const previousPath = location.pathname === "" ? "/" : location.pathname;

    return <Navigate to="/login" state={{page: previousPath}} replace/>
  }

  return children
}

export function AdminPrivateRoute({children}) {
  const {token} = useAuth();
  const location = useLocation();
  const decodedToken = token ? jwtDecode(token) : "";
  
  if(!token) {
    const previousPath = location.pathname === "/login" ? "/" : location.pathname;

    return <Navigate to="/login" state={{page: previousPath}} replace/>
  }
  
  if(decodedToken.role !== "admin") return(<Navigate to="/" replace/>)

  return children
}
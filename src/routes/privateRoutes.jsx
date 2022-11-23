import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/use-User";
import * as ROUTES  from "./routes";

const PrivateRoutes = () => {

  const userLocal = localStorage.getItem('authUser')
  return userLocal ? <Outlet /> : <Navigate to={ROUTES.LOGIN} /> 
   
}
 
export default PrivateRoutes;
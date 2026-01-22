import React from 'react'
import { clear_localstorage, get_localstorage } from './utils'
import { ADMIN_KEY, TOKEN_KEY } from '../constatns/api'
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem(TOKEN_KEY); // or from context
  const role = localStorage.getItem("ROLE");   // admin / staff

  if (!token) {
    return <Navigate to="/staff/login" replace />;
    clear_localstorage()
  }
  console.log(allowedRoles, role)
//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

  return <Outlet />;
};

export default ProtectedRoute;

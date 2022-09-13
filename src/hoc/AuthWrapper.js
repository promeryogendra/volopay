import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthWrapper({ children }) {
  const auth = useSelector((state) => state.auth);
  return auth.isAuth ? children : <Navigate to="/signin" />;
}

export default AuthWrapper;

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NoAuthWrapper({ children }) {
  const auth = useSelector((state) => state.auth);
  return auth.isAuth ? <Navigate to="/" /> : children;
}

export default NoAuthWrapper;

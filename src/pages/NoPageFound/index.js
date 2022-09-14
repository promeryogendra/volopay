import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NoPageFound() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <div className="page-404-wrapper">
      <h1 className="page-404-message">404</h1>
      <h3 className="page-404-desc">Page not found</h3>
      <p>
        Please go to{" "}
        {isAuth ? (
          <Link to="/home/all">Home</Link>
        ) : (
          <Link to="/signin">Login</Link>
        )}{" "}
        page
      </p>
    </div>
  );
}

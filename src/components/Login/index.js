import { connect } from "react-redux";
import React, { useState } from "react";
import { checkLogin } from "../../store/actions/auth";
import Loader from "../Loader";
import "./index.css";

function Login({ loginLoading, ...props }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    e.target.name === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.checkLogin({ username, password });
  };
  const validate = (e) => {
    return !(username || "").trim() || !(password || "").trim();
  };

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        {loginLoading && <Loader />}
        <h4>Login</h4>
        <div className="form-group">
          <label>Username</label>
          <input
            onChange={handleChange}
            value={username}
            type={"text"}
            className="form-control"
            name={"username"}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={handleChange}
            value={password}
            type={"password"}
            className="form-control"
            name={"password"}
            autoComplete="off"
          />
        </div>
        <button
          disabled={validate() || loginLoading}
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginLoading: state.auth.loginLoading,
  };
};

export default connect(mapStateToProps, { checkLogin })(Login);

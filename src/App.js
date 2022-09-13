import { Fragment, useLayoutEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NoPageFound from "./pages/NoPageFound";
import AuthWrapper from "./hoc/AuthWrapper";
import NoAuthWrapper from "./hoc/NoAuthWrapper";
import { checkSession } from "./store/actions/auth";
import Login from "./components/Login";
import Loader from "./components/Loader";
import { connect } from "react-redux";

function App(props) {
  useLayoutEffect(() => {
    props.checkSession();
  }, []);
  return (
    <Fragment>
      <div id="application_wrapper">
        {props.loading ? (
          <Loader />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthWrapper>
                    <Home />
                  </AuthWrapper>
                }
              />
              <Route
                path="/signin"
                element={
                  <NoAuthWrapper>
                    <Login />
                  </NoAuthWrapper>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="not_found" element={<NoPageFound />} />
              <Route path="*" element={<Navigate to="/not_found" replace />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { checkSession })(App);

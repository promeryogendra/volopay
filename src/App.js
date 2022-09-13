import { connect } from "react-redux";
import { setLoading } from "./store/actions/auth";
import "./App.css";

function App(props) {
  console.log(props.loading);
  return (
    <div onClick={(e) => props.setLoading(!props.loading)} className="App">
      App
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { setLoading })(App);

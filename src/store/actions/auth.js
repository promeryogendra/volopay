import actions from ".";
import api from "../../api";
import { setAuth, getAuth } from "../../lib";

export const setLoading = (loading) => (dispatch) => {
  dispatch({ type: actions.SET_SESSION_LOADING, payload: { loading } });
};

export const checkSession = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    let res = await api.checkSession(getAuth().owner_id);
    return dispatch({
      type: actions.SET_SESSION_DATA,
      payload: { user: res.data, isAuth: true },
    });
  } catch (error) {
    return dispatch({
      type: actions.SET_SESSION_DATA,
      payload: { user: null, isAuth: false },
    });
  }
};

export const checkLogin = (payload) => async (dispatch) => {
  dispatch({
    type: actions.SET_SESSION_LOADING,
    payload: { loginLoading: true },
  });
  try {
    let res = await api.checkLogin(payload);
    setAuth(res.data);
    return dispatch({
      type: actions.SET_SESSION_DATA,
      payload: { user: res.data, isAuth: true },
    });
  } catch (error) {
    setAuth({});
    return dispatch({
      type: actions.SET_SESSION_DATA,
      payload: { user: null, isAuth: false },
    });
  }
};

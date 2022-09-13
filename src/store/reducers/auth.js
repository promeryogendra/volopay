import actions from "../actions/";

const INITIAL_STATE = {
  loading: true,
  loginLoading: false,
  user: null,
  isAuth: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  let payload = action.payload;
  switch (action.type) {
    case actions.SET_SESSION_LOADING:
      return {
        ...state,
        ...payload,
      };
    case actions.SET_SESSION_DATA:
      return { ...state, loading: false, loginLoading: false, ...payload };
    default:
      return state;
  }
};

export default reducer;

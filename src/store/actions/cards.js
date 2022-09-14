import actions from ".";
import api from "../../api";

export const setDataLoading = (loading) => (dispatch) => {
  dispatch({ type: actions.SET_CARDS_LOADING, payload: { loading } });
};

export const clearState = () => (dispatch) => {
  dispatch({ type: actions.CLEAR_CARDS });
};

export const getCards = (payload) => async (dispatch) => {
  if (payload.new) dispatch(clearState());
  dispatch(setDataLoading(true));
  try {
    let res = await api.loadCardsData(payload || {});
    return dispatch({
      type: actions.SET_CARDS_DATA,
      payload: {
        cards: res.data,
        noMoreCards: res.data.length < 10,
        new: payload.new,
        error: null,
      },
    });
  } catch (error) {
    return dispatch({
      type: actions.SET_CARDS_DATA,
      payload: {
        cards: [],
        noMoreCards: false,
        new: payload.new,
        error: error,
      },
    });
  }
};

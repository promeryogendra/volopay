import actions from "../actions/";

const INITIAL_STATE = {
  loading: false,
  noMoreCards: false,
  cards: [],
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  let payload = action.payload;
  switch (action.type) {
    case actions.SET_CARDS_LOADING:
      return { ...state, ...payload };
    case actions.SET_CARDS_DATA:
      payload.cards = payload.new
        ? payload.cards
        : [...state.cards, ...payload.cards];
      return { ...state, loading: false, ...payload };
    case actions.CLEAR_CARDS:
      return { ...state, cards: [], noMoreCards: false };
    default:
      return state;
  }
};

export default reducer;

import { combineReducers } from "redux";
import authReducer from "./auth";
import cardsReducer from "./cards";
const rootReducer = combineReducers({
  cards: cardsReducer,
  auth: authReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import Game from "./gameReducer";

const rootReducer = combineReducers({
  Game,
});

export default rootReducer;

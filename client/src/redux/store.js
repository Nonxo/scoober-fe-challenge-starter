import { compose, createStore } from "redux";
import rootReducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

const Store = createStore(rootReducer, composeEnhancers());

export default Store;

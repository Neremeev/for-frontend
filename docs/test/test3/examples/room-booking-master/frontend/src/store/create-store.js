import {createStore, compose} from "redux";
import {rootReducer} from "../reducers";

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const store = createStore(
    rootReducer,
    composeWithDevTools()
);

import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./rootReducer";
import {logger} from "redux-logger";

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
    Boolean
);
const composedEnhancers = compose(applyMiddleware(...middleWares));
export const store = createStore(rootReducer, undefined, composedEnhancers )
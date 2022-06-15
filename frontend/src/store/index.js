import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import SongReducer from './search';
import likeReducer from './like';
import CommentReducer from "./comments";

// ------------------------------------------------------------------------- //

const rootReducer = combineReducers({
  session: sessionReducer,
  search: SongReducer,
  likes: likeReducer,
  comments: CommentReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

// ------------------------------------------------------------------------- //

export default configureStore;

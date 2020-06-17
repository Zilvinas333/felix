import { createStore, applyMiddleware, combineReducers  } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";

import content from "../../content";
console.log(content, "abc");
const allMiddleware =
  process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? composeWithDevTools(applyMiddleware(apiMiddleware, thunk))
    : applyMiddleware(apiMiddleware, thunk); //parametruose galiu paimti visus middlewarus


//allMiddleware reikejo isskirti norint pridurti prie createStore butent apiMiddleware is redux-api-middleware


//const store = createStore(content.reducer, allMiddleware);

const store = createStore(
    combineReducers({ content: content.reducer, random: (state = {}) => {return state} }),
    allMiddleware
  );

export default store;
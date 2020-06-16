import { createStore } from "redux";
import content from "../../content";
import { composeWithDevTools } from 'redux-devtools-extension';

console.log(content);
const store = createStore(content.reducer, process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
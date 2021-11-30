import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'//用于支持异步action 
import { composeWithDevTools } from 'redux-devtools-extension';//开发者工具 
import reducer from "../reducer";

//在开发环境用
const enhancer = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk);

const store = createStore(reducer, enhancer);

console.log(store)

console.log(store.getState())


export default store;
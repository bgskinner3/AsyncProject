// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
// import auth from './auth';

// const appReducer = combineReducers({
//   auth,
// });

// const store = createStore(
//   appReducer,
//   applyMiddleware(thunkMiddleware, createLogger())
// );

// export default store;
// export * from './auth';

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'

const reducer = combineReducers({ auth })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'

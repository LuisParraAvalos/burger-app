import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducerIngredients from './store/reducers/ingredients';
import reducerOrders from './store/reducers/orders';
import reducerAuth from './store/reducers/auth';
import thunk from 'redux-thunk';

const logger = store => {
  return next => {
    return action => {
      // console.log("[Middleware] - action: ", action);
      const result = next(action);
      // console.log("[Middleware] - new State: ", store.getState());
      return result;
    }
  }
}

const rootReducer = combineReducers({
  ings: reducerIngredients,
  orders: reducerOrders,
  auth: reducerAuth
});

// console.log("NODE_ENV: " + process.env.NODE_ENV);

const composeEnhancers = process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :  null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import axios from '../../axios-orders';
import actionTypes from '../actions/actionTypes';
import { setupIngredients } from './ingredients';

const submitOrderSucceed = (response, order) => {
  return {type: actionTypes.SUBMIT_ORDER_SUCCEED, response: response, order: order };
};

const submitOrderFailed = (error) => {
  return { type: actionTypes.SUBMIT_ORDER_FAILED, error: error };
};

const submitOrder = () => {
  return { type: actionTypes.SUBMIT_ORDER };
};

export const postOrder = (order, token) => {
  return dispatch => {
    dispatch(submitOrder());
    axios.post('/orders.json?auth=' + token , order)
      .then( response => {
        dispatch(submitOrderSucceed(response.data, order));
        dispatch(clearOrder());
        dispatch(setupIngredients());
      })
      .catch(error => {
        dispatch(submitOrderFailed(error));
      });
  };
};

export const clearOrder = () => {
  return { type: actionTypes.CLEAR_ORDER };
}

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
}

export const fetchOrders = () => {
  return { type: actionTypes.FETCH_ORDERS };
}

const fetchOrdersSucceed = (orders) => {
  return {type: actionTypes.FETCH_ORDERS_SUCCEED, orders: orders };
};

const fetchOrdersFailed = (error) => {
  return { type: actionTypes.FETCH_ORDERS_FAILED, error: error };
};

export const getOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrders());
    const params =  new URLSearchParams({ auth: token, orderBy: '"userId"', equalTo: `"${userId}"` }).toString()
    // const params = 'auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json?' + params)
      .then(response => {
        let orders = [];
        if (response.data) {
          for (const key in response.data) {
            orders.push({ id: key, ...response.data[key] })
          }
          dispatch(fetchOrdersSucceed(orders));
        }
        else {
          dispatch(fetchOrdersFailed('No data'));
        }
      })
      .catch(error => {
        // console.log("Error -09", error);
        dispatch(fetchOrdersFailed(error));
      });
  };
};
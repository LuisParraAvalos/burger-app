import actionTypes from '../actions/actionTypes';

export const submitOrderSucceed = (response, order) => {
  return {type: actionTypes.SUBMIT_ORDER_SUCCEED, response: response, order: order };
};

export const submitOrderFailed = (error) => {
  return { type: actionTypes.SUBMIT_ORDER_FAILED, error: error };
};

export const submitOrder = () => {
  return { type: actionTypes.SUBMIT_ORDER };
};

export const postOrder = (order, token) => {
  return { type: actionTypes.POST_ORDER, order: order, token: token };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
}

export const fetchOrders = () => {
  return { type: actionTypes.FETCH_ORDERS };
}

export const fetchOrdersSucceed = (orders) => {
  return {type: actionTypes.FETCH_ORDERS_SUCCEED, orders: orders };
};

export const fetchOrdersFailed = (error) => {
  return { type: actionTypes.FETCH_ORDERS_FAILED, error: error };
};

export const getOrders = (token, userId) => {
  return { type: actionTypes.GET_ORDERS, token: token, userId: userId };
};
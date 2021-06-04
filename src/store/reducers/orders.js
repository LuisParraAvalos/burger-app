
import actionTypes from '../actions/actionTypes';
import { updateState } from '../../shared/utility';

const initialState = {
    error: null,
    orders: [],
    loading: false,
    purchasing: false
};

const submitOrderSucceed = (state, action) => {
    const newOrder = { 
        ...action.order,
        id: action.response.name
    };
    return updateState(state, { orders: state.orders.concat(newOrder), error: null, loading: false, purchasing: false });
};

const submitOrderFailed= (state, action) => {
    return updateState(state, { error: action.error, loading: false, purchasing: false });
};

const submitOrder = (state) => updateState(state, { loading: true });

const purchaseInit = (state) => updateState(state, { purchasing: true });

const fetchOrders = (state ) => updateState(state, {loading: true});

const fetchOrdersSucceed = (state, action) => {
    const newState = {
        orders: action.orders,
        loading: false,
        error: null
    };
    return updateState(state, newState);
};

const fetchOrdersFailed = (state, action) => {
    const newState = {
        loading: false,
        error: action.error
    };
    return updateState(state, newState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMIT_ORDER:
            return submitOrder(state);
        case actionTypes.SUBMIT_ORDER_SUCCEED:
            return submitOrderSucceed(state, action);
        case actionTypes.SUBMIT_ORDER_FAILED:
            return submitOrderFailed(state, action);
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state);
        case actionTypes.FETCH_ORDERS:
            return fetchOrders(state);
        case actionTypes.FETCH_ORDERS_SUCCEED:
            return fetchOrdersSucceed(state, action);
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailed(state, action);
        default:
            return state;
    }
};

export default reducer;
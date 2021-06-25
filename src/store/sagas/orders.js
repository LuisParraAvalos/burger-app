import { put } from 'redux-saga/effects';
import * as actions from "../actions/index";
import axios from '../../axios-orders';

export function* postOrder(action) {
    yield put(actions.submitOrder());
    try {
        console.log("action: ", action);
        const response = yield axios.post('/orders.json?auth=' + action.token, action.order);
        yield put(actions.submitOrderSucceed(response.data, action.order));
        yield put(actions.clearOrder());
        yield put(actions.setupIngredients());
    }
    catch (error) {
        yield put(actions.submitOrderFailed(error));
    }
}

export function* getOrders(action) {
    yield put(actions.fetchOrders());
    const params = new URLSearchParams({ 
        auth: action.token, 
        orderBy: '"userId"', equalTo: `"${action.userId}"` 
    }).toString()
    // const params = 'auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    try {
        const response = yield axios.get('/orders.json?' + params)
        let orders = [];
        if (response.data) {
            for (const key in response.data) {
                orders.push({ id: key, ...response.data[key] })
            }
            yield put(actions.fetchOrdersSucceed(orders));
        }
        else {
            yield put(actions.fetchOrdersFailed('No data'));
        }
    }
    catch (error) {
        // console.log("Error -09", error);
        yield put(actions.fetchOrdersFailed(error));
    }
}
import { takeEvery } from 'redux-saga/effects';

import actions from '../actions/actionTypes';
import { logout, timeoutLogout, authUser, checkAuthState } from './auth';
import { postOrder, getOrders } from './orders';
import { setupIngredients } from './ingredients';

export function* watchAuth() {
    yield takeEvery(actions.AUTH_INIT_LOGOUT, logout);
    yield takeEvery(actions.AUTH_SETUP_LOGOUT_TIMEOUT, timeoutLogout);
    yield takeEvery(actions.AUTH_USER, authUser);
    yield takeEvery(actions.AUTH_CHECK_AUTH_STATE, checkAuthState);
}

export function* watchOrders() {
    yield takeEvery(actions.POST_ORDER, postOrder);
    yield takeEvery(actions.GET_ORDERS, getOrders);
}

export function* watchIngredients() {
    yield takeEvery(actions.INIT_SETUP_INGREDIENTS, setupIngredients);
}
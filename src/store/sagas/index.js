import { takeEvery } from 'redux-saga/effects';

import actions from '../actions/actionTypes';
import { logout, timeoutLogout } from './auth'


export function* watchAuth() {
    yield takeEvery(actions.AUTH_INIT_LOGOUT, logout);
    yield takeEvery(actions.AUTH_TIMEOUT_LOGOUT, timeoutLogout);
}

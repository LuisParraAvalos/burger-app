import { takeEvery } from 'redux-saga/effects';

import actions from '../actions/actionTypes';
import { logout, timeoutLogout, authUser, checkAuthState } from './auth'


export function* watchAuth() {
    yield takeEvery(actions.AUTH_INIT_LOGOUT, logout);
    yield takeEvery(actions.AUTH_SETUP_LOGOUT_TIMEOUT, timeoutLogout);
    yield takeEvery(actions.AUTH_USER, authUser);
    yield takeEvery(actions.AUTH_CHECK_AUTH_STATE, checkAuthState);
}

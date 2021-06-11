import { put, delay } from 'redux-saga/effects';

import * as actions from "../actions/index";

export function* logout(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expirationDate');
    yield put(actions.logoutSucceed());
}

export function* timeoutLogout(action) {
    yield delay(action.expTime * 1000);
    yield put(actions.logout());
}
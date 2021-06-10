import { put } from 'redux-saga/effects';

import actions from "../actions/actionTypes";

export function* logout(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expirationDate');
    yield put( { type: actions.AUTH_LOGOUT } );
}
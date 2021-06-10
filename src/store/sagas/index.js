import { takeEvery } from 'redux-saga/effects';

import actions from '../actions/actionTypes';
import { logout } from './auth'


export function* watchAuth() {
    yield takeEvery(actions.AUTH_INIT_LOGOUT, logout);
}
import { put, delay } from 'redux-saga/effects';

import axios from 'axios';
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

export function* checkAuthState(action) {   
    const token = localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    }
    else {
        const expDate = localStorage.getItem('expirationDate');
        const expirationDate = new Date(expDate);
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        }
        else{
            const localId = localStorage.getItem('userId');
            const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
            yield put(actions.authSucceed(token, localId));
            yield put(actions.authLogout(expiresIn));
        }
    }
}

export function* authUser(action) {
    let url;
    yield put(actions.authStart());

    if (action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPGR1JCFIiVdzlOQMStkEl4QEwDeWG7eM';
    }
    else {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPGR1JCFIiVdzlOQMStkEl4QEwDeWG7eM';
    }
    try {
        const response = yield axios.post(url, {
             email: action.email, password: action.password, returnSecureToken: true });
        // console.log(response);
        const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('expirationDate', expDate);
        yield put(actions.authSucceed(response.data.idToken, response.data.localId));
        yield put(actions.authLogout(response.data.expiresIn));
    } catch(error) {
        // console.log(error);
        yield put(actions.authFailed(error));
    };
}
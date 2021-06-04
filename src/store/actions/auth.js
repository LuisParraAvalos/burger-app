import actions from "./actionTypes";
import axios from 'axios';

const authStart = () => {
    return { type: actions.AUTH_START };
}

const authSucceed = (token, userId) => {
    return { type: actions.AUTH_START_SUCCEED, token: token, userId: userId };
}

const authFailed = (error) => {
    return { type: actions.AUTH_START_FAILED, error: error };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return { type: actions.AUTH_LOGOUT };
}

const authLogout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expTime * 1000);
    };
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expDate = localStorage.getItem('expirationDate');
            const expirationDate = new Date(expDate);
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else{
                const localId = localStorage.getItem('userId');
                const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(authSucceed(token, localId));
                dispatch(authLogout(expiresIn));
            }
        }
    };
}

export const auth = (email, password, isSignUp) => {
    let url;
    if (isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPGR1JCFIiVdzlOQMStkEl4QEwDeWG7eM';
    }
    else {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPGR1JCFIiVdzlOQMStkEl4QEwDeWG7eM';
    }
    return dispatch => {
        dispatch(authStart());
        axios.post(url,
            { email: email, password: password, returnSecureToken: true })
            .then(response => {
                // console.log(response);
                const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expDate);
                dispatch(authSucceed(response.data.idToken, response.data.localId));
                dispatch(authLogout(response.data.expiresIn));
            })
            .catch(error => {
                // console.log(error);
                dispatch(authFailed(error));
            });
    };
}
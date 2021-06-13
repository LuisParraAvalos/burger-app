import actions from "./actionTypes";

export const authStart = () => {
    return { type: actions.AUTH_START };
}

export const authSucceed = (token, userId) => {
    return { type: actions.AUTH_START_SUCCEED, token: token, userId: userId };
}

export const authFailed = (error) => {
    return { type: actions.AUTH_START_FAILED, error: error };
}

export const logout = () => {
    return { type: actions.AUTH_INIT_LOGOUT };
}

export const logoutSucceed = () => {
    return { type: actions.AUTH_LOGOUT } ;
}

export const authLogout = (expTime) => {
    return { type: actions.AUTH_SETUP_LOGOUT_TIMEOUT, expTime: expTime };
}

export const checkAuthState = () => {
    return { type: actions.AUTH_CHECK_AUTH_STATE };
}

export const auth = (email, password, isSignUp) => {
    return { type: actions.AUTH_USER, email: email, password: password, isSignUp: isSignUp };
}
import actions from '../actions/actionTypes';
import { updateState } from '../../shared/utility';

const initialState = {
    authenticating: false,
    token: null,
    userId: null,
    error: null
};

const authStarted = (state) => {
    return updateState(state, { authenticating: true,  error: null});
}

const authSucceed = (state, action) => {
    return updateState(state, { token: action.token, userId: action.userId, authenticating: false, error: null });
}

const authFailed= (state, action) => {
    return updateState(state, { authenticating: false, error: action.error });
}

const authLogout = (state, action) =>{
    return updateState(state, { token: null, userId: null});
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            return authStarted(state);
        case actions.AUTH_START_SUCCEED:
            return authSucceed(state, action);
        case actions.AUTH_START_FAILED:
            return authFailed(state, action);
        case actions.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
};

export default auth;
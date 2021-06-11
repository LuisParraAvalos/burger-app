const actions = Object.freeze({
    SETUP_INGREDIENTS: 'SETUP_ING',
    SETUP_INGREDIENTS_FAILED: 'SETUP_ING_FAILED',
    ADD_INGREDIENTS: 'ADD_INGS',
    REMOVE_INGREDIENTS: 'REMOVE_INGS',
    ADD_INGREDIENT: 'ADD_ING',
    REMOVE_INGREDIENT: 'REMOVE_ING',
    CLEAR_ORDER: 'CLEAR_ORDER',
    SUBMIT_ORDER: 'SUBMIT_ORDER',
    SUBMIT_ORDER_SUCCEED: 'SUBMIT_ORDER_SUCEED',
    SUBMIT_ORDER_FAILED: 'SUBMIT_ORDER_FAILED',
    PURCHASE_INIT: 'PURCHASE_INIT',
    FETCH_ORDERS: 'FETCH_ORDERS',
    FETCH_ORDERS_SUCCEED: 'FETCH_ORDERS_SUCCEED',
    FETCH_ORDERS_FAILED: 'FETCH_ORDERS_FAILED',
    AUTH_START: 'AUTH_START',
    AUTH_START_SUCCEED: 'AUTH_START_SUCCEED',
    AUTH_START_FAILED: 'AUTH_START_FAILED',
    AUTH_LOGOUT: 'AUTH_LOGOUT',
    AUTH_INIT_LOGOUT: 'AUTH_INIT_LOGOUT',
    AUTH_TIMEOUT_LOGOUT: 'AUTH_TIMEOUT_LOGOUT',
    SET_AUTH_REDIRECT_PATH: 'SET_AUTH_REDIRECT_PATH'
});

export default actions;
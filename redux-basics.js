const redux = require('redux');

const InitialState = {
    counter: 0
};

//Reducer
const reducer = (state = InitialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return { ...state, counter: state.counter + 1 };
    }
    if (action.type === 'ADD_COUNTER') {
        return { ...state, counter: state.counter + action.value };
    }
    return state;
}

//Store
const store = redux.createStore(reducer);
// console.log(store.getState());

//Subscription
store.subscribe(() => {
    // console.log('[Subscription]', store.getState());
});

//Dispatching
store.dispatch({ type: 'INC_COUNTER' });
store.dispatch({ type: 'ADD_COUNTER', value: 20 });
// console.log(store.getState());
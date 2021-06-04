import actions from '../actions/actionTypes';
import { updateState } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: null,
    building: false,
    authRedirectPath: '/'
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

const addIngredient = (state, action) => {
    return updateState(state, {
        ingredients: {
            ...state.ingredients,
            [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
        building: true
    });
};

const removeIngredient = (state, action) => {
    if (state.ingredients[action.ingredient] <= 0)
        return updateState(state, { ingredients: { ...state.ingredients } });
    return updateState(state, {
        ingredients: {
            ...state.ingredients,
            [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
        building: true
    });
};

const setupIngredients = (state, action) => updateState(state, { ingredients: action.ingredients, totalPrice: 4, error: null, building: false });

const addIngredients = (state, action) => updateState(state, { ingredients: action.ingredients, totalPrice: action.total });

const removeIngredients = (state, action) => updateState(state, { ingredients: action.ingredients, totalPrice: action.total });

const setupIngredientsFailed = (state, action) => updateState(state, { error: action.error });

const clearOrder = () => initialState;

const setRedirectPath = (state, action) => {
    return updateState(state, { authRedirectPath: action.path });
};

const ingredients = (state = initialState, action) => {
    switch (action.type) {
        case actions.SETUP_INGREDIENTS:
            return setupIngredients(state, action);
        case actions.SETUP_INGREDIENTS_FAILED:
            return setupIngredientsFailed(state, action);
        case actions.ADD_INGREDIENTS:
            return addIngredients(state, action);
        case actions.REMOVE_INGREDIENTS:
            return removeIngredients(state, action);
        case actions.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actions.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actions.CLEAR_ORDER:
            return clearOrder();
        case actions.SET_AUTH_REDIRECT_PATH:
            return setRedirectPath(state, action);
        default:
            return state;
    }
};

export default ingredients;
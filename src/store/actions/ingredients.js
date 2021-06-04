import actionTypes from "./actionTypes";
import axios from '../../axios-orders';

export const addIngredient = (ingredient) => {
    return { type: actionTypes.ADD_INGREDIENT, ingredient: ingredient };
}

export const removeIngredient = (ingredient) => {
    return { type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient }
}

export const addIngredients = (ingredients, total) => {
    return { type: actionTypes.ADD_INGREDIENTS, ingredients: ingredients, total: total };
}

export const removeIngredients = (ingredients, total) => {
    return { type: actionTypes.REMOVE_INGREDIENTS, ingredients: ingredients, total: total };
}

const setIngredients = (ingredients) => {
    return { type: actionTypes.SETUP_INGREDIENTS, ingredients: ingredients };
}

export const setIngredientsFailed = (error) => {
    return { type: actionTypes.SETUP_INGREDIENTS_FAILED, error: error };
}

export const clearOrder = () => {
    return { type: actionTypes.CLEAR_ORDER };
}

export const setupIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            if (response.data) {
                dispatch(setIngredients(response.data));
            }
            else {
                dispatch(setIngredientsFailed({ error: 'No data' }));
            }
        })
        .catch(error => {
            dispatch(setIngredientsFailed({ error: error }));
        });
    };
}

export const setRedirectPath = (path) => {
    return { type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path };
}
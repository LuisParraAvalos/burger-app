import actionTypes from "./actionTypes";

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

export const setIngredients = (ingredients) => {
    return { type: actionTypes.SETUP_INGREDIENTS, ingredients: ingredients };
}

export const setIngredientsFailed = (error) => {
    return { type: actionTypes.SETUP_INGREDIENTS_FAILED, error: error };
}

export const clearOrder = () => {
    return { type: actionTypes.CLEAR_ORDER };
}

export const setupIngredients = () => {
    return { type: actionTypes.INIT_SETUP_INGREDIENTS };
}

export const setRedirectPath = (path) => {
    return { type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path };
}

import * as actions from "../actions/index";
import axios from "../../axios-orders";
import { put } from 'redux-saga/effects';

export function* setupIngredients(action) {
    try {
        const response = yield axios.get('/ingredients.json');
        if (response.data) {
            yield put(actions.setIngredients(response.data));
        }
        else {
            yield put(actions.setIngredientsFailed({ error: 'No data' }));
        }
    }
    catch (error) {
        yield put(actions.setIngredientsFailed({ error: error }));
    }
}
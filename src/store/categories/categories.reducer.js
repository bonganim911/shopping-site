import {CATEGORIES_ACTION_TYPES} from "./categories.types";

const INITIAL_CATEGORIES = {
    categoriesMap: {}
}

export const categoriesReducer = (state = INITIAL_CATEGORIES, action = {}) => {
    const {type, payload} = action;
    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
            return {...state, categoriesMap: payload}
        default:
            return state;
    }

}
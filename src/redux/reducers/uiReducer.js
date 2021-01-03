import {
    CLEAR_ERRORS, LOADING_UI,
    SET_ERRORS,
} from "../action-types";

const initialState = {
    loading: false,
    errors: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            }
        case LOADING_UI:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}
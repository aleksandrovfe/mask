import {
    DELETE_SCREAM,
    LIKE_SCREAM,
    LOADING_DATA, POST_SCREAM, SET_SCREAM,
    SET_SCREAMS, SUBMIT_COMMENT,
    UNLIKE_SCREAM
} from "../action-types";

const initialState = {
    screams: [],
    scream: {},
    loading: false,
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: action.payload,
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false,
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload,
                loading: false,
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            const likeIndex = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)

            state.screams[likeIndex].likeCount = action.payload.likeCount
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = action.payload
            }
            return {
                ...state,
            }
        case DELETE_SCREAM:
            return {
                ...state,
                screams: state.screams.filter(scream => scream.screamId !== action.payload)
            }
        case POST_SCREAM:
            return {
                screams: [action.payload, ...state.screams]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments],
                },
            }
        default:
            return state
    }
}
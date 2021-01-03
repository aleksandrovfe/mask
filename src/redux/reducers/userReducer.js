import {
    LIKE_SCREAM,
    LOADING_USER, MARK_NOTIFICSTION_READ,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_USER,
    UNLIKE_SCREAM
} from "../action-types";

const initialState = {
    authenticated: false,
    credentials: {},
    loading: false,
    likes: [],
    notifications: [],
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
            }
        case MARK_NOTIFICSTION_READ:
            state.notifications.forEach(not => not.read = true)
            return {
                ...state,
            }
        default:
            return state
    }
}
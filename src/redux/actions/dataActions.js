import axios from "axios";
import {
    CLEAR_ERRORS,
    DELETE_SCREAM,
    LIKE_SCREAM,
    LOADING_DATA, LOADING_UI,
    POST_SCREAM, SET_ERRORS, SET_SCREAM,
    SET_SCREAMS, SUBMIT_COMMENT,
    UNLIKE_SCREAM
} from "../action-types";

export const getAllScreams = () => async (dispatch) => {
    dispatch({type: LOADING_DATA, payload: true})

    try {
        const response = await axios.get('/screams')
        dispatch({type: SET_SCREAMS, payload: response.data})

        dispatch({type: LOADING_DATA, payload: false})
    } catch (error) {
        dispatch({type: SET_SCREAMS, payload: []})
        console.log(error)
    }
}
export const getScream = (screamId) => async (dispatch) => {
    dispatch({type: LOADING_UI, payload: true})

    try {
        const response = await axios.get(`/scream/${screamId}`)
        dispatch({type: SET_SCREAM, payload: response.data})
        dispatch({type: LOADING_UI, payload: false})
    } catch (error) {
        console.log(error)
    }
}

export const likeScream = (screamId) => async (dispatch) => {
    try {
        const response = await axios.get(`/scream/${screamId}/like`)
        dispatch({type: LIKE_SCREAM, payload: response.data})
    } catch (error) {
        console.log(error)
    }
}
export const unlikeScream = (screamId) => async (dispatch) => {
    try {
        const response = await axios.get(`/scream/${screamId}/unlike`)
        dispatch({type: UNLIKE_SCREAM, payload: response.data})
    } catch (error) {
        console.log(error)
    }
}
export const submitComment = (screamId, commentData) => async (dispatch) => {
    try {
        const response = await axios.post(`/scream/${screamId}/comment`, commentData)
        dispatch({type: SUBMIT_COMMENT, payload: response.data})
        dispatch({type: CLEAR_ERRORS})
    } catch (error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response && error.response.data
        })
        console.log(error)
    }
}
export const deleteScream = (screamId) => async (dispatch) => {
    try {
        await axios.delete(`/scream/${screamId}`)
        dispatch({type: DELETE_SCREAM, payload: screamId})
    } catch (error) {
        console.log(error)
    }
}
export const getUserData = (userHandle) => async (dispatch) => {
    dispatch({type: LOADING_DATA, payload: true})
    try {
        const response = await axios.get(`/user/${userHandle}`)
        dispatch({type: SET_SCREAMS, payload: response.data.screams})
        dispatch({type: LOADING_DATA, payload: false})
    } catch (error) {
        dispatch({type: SET_SCREAMS, payload: null})
        dispatch({type: LOADING_DATA, payload: false})
        console.log(error)
    }
}
export const postScream = (newScream) => async (dispatch) => {
    dispatch({type: LOADING_DATA})
    try {
        const response = await axios.post(`/scream`, newScream)
        dispatch({type: POST_SCREAM, payload: response.data})
        dispatch({type: CLEAR_ERRORS})
    } catch (error) {
        console.log(error)
        dispatch({
            type: SET_ERRORS,
            payload: error.response && error.response.data
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}
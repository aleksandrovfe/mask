import axios from "axios";
import {
    CLEAR_ERRORS,
    LOADING_DATA,
    LOADING_USER,
    MARK_NOTIFICSTION_READ,
    SET_ERRORS,
    SET_UNAUTHENTICATED,
    SET_USER
} from "../action-types";

export const loginUser = (userData, history) => async dispatch => {
    dispatch({type: LOADING_DATA, payload: true})
    try {
        const response = await axios.post('/login', userData)

        setAuthHeader(response.data.token)

        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS})

        dispatch({type: LOADING_DATA, payload: false})

        history.push('/')
    } catch (error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data
        })

        dispatch({type: LOADING_DATA, payload: false})
    }
}

export const signupUser = (newUserData, history) => async dispatch => {
    dispatch({type: LOADING_DATA, payload: true})
    try {
        const response = await axios.post('/signup', newUserData)

        setAuthHeader(response.data.token)

        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS})

        dispatch({type: LOADING_DATA, payload: false})

        history.push('/')
    } catch (error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data
        })

        dispatch({type: LOADING_DATA, payload: false})
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']

    dispatch({type: SET_UNAUTHENTICATED})
}

export const getUserData = () => async dispatch => {
    dispatch({type: LOADING_USER})
    try {
        const response = await axios.get('/user')
        dispatch({
            type: SET_USER,
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const uploadImage = (formData) => async (dispatch) => {
    dispatch({type: LOADING_USER})
    try {
        await axios.post('/user/image', formData)
        dispatch(getUserData())
    } catch (error) {
        console.log(error)
    }
}

export const editUserProfile = (userData) => async (dispatch) => {
    dispatch({type: LOADING_USER})
    try {
        await axios.post('/user', userData)
        dispatch(getUserData())
    } catch (error) {
        console.log(error)
    }
}
export const markNotificationsRead = (notificationId) => async (dispatch) => {
    try {
        await axios.post('/notifications', notificationId)
        dispatch({type: MARK_NOTIFICSTION_READ})
    } catch (error) {
        console.log(error)
    }
}


const setAuthHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken
}
/** @format */

import { createSlice } from '@reduxjs/toolkit'
import { notification } from '../reducers/notificationReducer'
import { getToken, setToken } from '../utils'
import Authentication from '../services/login'

const initialState = {}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, { payload }) => payload,
        clearAuth: () => initialState,
    },
})

// This function will be called from App.js when the page is loaded
// to check if the user is logged in with a token
export const initializeAuth = () => {
    return dispatch => {
        // If the user has a token, call the setAuth action to set it
        getToken() && dispatch(setAuth(getToken()))
    }
}

// This function will be called from Login.js when the user is logging in
// to check if the user is logged in with a token
export const login = data => {
    return async dispatch => {
        try {
            // The token will be return from Authentication.login function
            const token = await Authentication.login(data)
            // If the login is successful, set the token to the local storage
            setToken(token)
            // Call the setAuth action to set the token to global state
            dispatch(setAuth(token))
        } catch (error) {
            // If the login is not successful, call the notification action
            // to show the error message
            dispatch(notification(error.message))
        }
    }
}

// This function will be called from the Logout button to logout the user
// and clear the auth state, local storage, and notification
export const logout = () => {
    return dispatch => {
        // Clear the token from the local storage
        setToken(null)
        // Call the clearAuth action to clear the auth state
        dispatch(clearAuth())
        // Clear the local storage
        window.localStorage.clear()
    }
}

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer

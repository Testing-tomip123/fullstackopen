/** @format */

import { createSlice } from '@reduxjs/toolkit'

//Creating initial state
const initialState = ''

//Creating slice
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        //Create action to set notification
        setNotification: (state, { payload }) => payload,
        //Create action to clear notification
        clearNotification: () => initialState,
    },
})

//Create action to set notification with a timeout
export const notification = message => {
    return dispatch => {
        //Clear previous timeout
        clearTimeout(window.notificationTimeout)
        //Dispatch set notification
        dispatch(setNotification(message))
        //Set new timeout
        window.notificationTimeout = setTimeout(
            () => dispatch(clearNotification()),
            5000
        )
    }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

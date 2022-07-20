/** @format */

import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { notification } from './notificationReducer'

// Initial state for the user reducer
const initialState = []

// Creates the user slice with the setUser action
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => payload,
    },
})

// A function that fetches all users and dispatches the setUser action with the users
export const getAllUsers = () => {
    return async dispatch => {
        try {
            const users = await userService.getAll()
            dispatch(setUser(users))
        } catch (error) {
            dispatch(notification('Could not get users'))
        }
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer

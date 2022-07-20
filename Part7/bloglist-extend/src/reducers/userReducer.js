/** @format */

import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

// Sets the initial state to an empty object
const initialState = {}

// Creates the user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Sets the state to the payload (user)
        setUser: (state, { payload }) => payload,
    },
})

// Creates an asynchronous thunk that fetches a single user and dispatches the user to the state
export const getUser = id => {
    return async dispatch => {
        const user = await userService.oneUser(id)
        dispatch(setUser(user))
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer

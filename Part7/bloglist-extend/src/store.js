/** @format */

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

// Store is created and the reducers are added to the store
const store = configureStore({
    reducer: {
        auth: authReducer,
        blogs: blogReducer,
        notification: notificationReducer,
        user: userReducer,
        users: usersReducer,
    },
})

export default store

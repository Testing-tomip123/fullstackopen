/** @format */

import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notification } from '../reducers/notificationReducer'

const initialState = []

/**
 * Blog Slice
 */
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        addBlog: (state, { payload }) => payload,
        removeBlog: (state, { payload }) =>
            state.filter(blog => blog.id === payload.id),
        replaceBlog: (state, { payload }) =>
            state.map(blog => (blog.id !== payload.id ? payload : blog)),
        appendBlog: (state, { payload }) => state.push(payload),
    },
})

/**
 * Initialize blogs
 *
 * @param {function} dispatch
 */
export const initializeBlogs = () => {
    return async dispatch => {
        try {
            const blogs = await blogService.getAll()
            dispatch(addBlog(blogs))
        } catch (error) {
            // Notify user if blogs could not be loaded
            dispatch(notification('Blogs could not be loaded'))
        }
    }
}

/**
 * Create Blog
 *
 * @param {object} data
 * @param {function} dispatch
 */
export const createBlog = data => {
    return async dispatch => {
        try {
            const blog = await blogService.create(data)
            dispatch(appendBlog(blog))
            // Notify user if blog was added
            dispatch(notification(`Blog ${blog.title} by ${blog.author} added`))
        } catch (error) {
            // Notify user if blog could not be added
            dispatch(notification('Blog could not be added'))
        }
    }
}

/**
 * Like Blog
 *
 * @param {ObjectId data type} id
 * @param {function} dispatch
 * @param {function} getState
 */
export const likeBlog = id => {
    return async (dispatch, getState) => {
        const blogs = getState().blogs
        const blog = blogs.find(blog => blog.id === id)
        const payload = {
            id,
            likes: blog.likes + 1,
        }

        try {
            const updatedBlog = await blogService.update(payload)
            // Notify user if blog was liked
            dispatch(replaceBlog(updatedBlog))
            dispatch(
                notification(
                    `Blog ${updatedBlog.title} by ${updatedBlog.author} liked`
                )
            )
        } catch (error) {
            // Notify user if blog could not be liked
            dispatch(notification('Blog could not be liked'))
        }
    }
}

/**
 * Comment Blog
 *
 * @param {ObjectId data type} id
 * @param {string} comment
 * @param {function} dispatch
 */
export const commentBlog = ({ id, comment }) => {
    return async dispatch => {
        try {
            const blog = await blogService.comment({ id, comment })
            dispatch(replaceBlog(blog))
            // Notify user if blog was commented
            dispatch(
                notification(`Blog ${blog.title} by ${blog.author} commented`)
            )
        } catch (error) {
            // Notify user if blog could not be commented
            dispatch(notification('Blog could not be commented'))
        }
    }
}

/**
 * Delete Blog
 *
 * @param {ObjectId data type} id
 * @param {function} dispatch
 */
export const deleteBlog = id => {
    return async dispatch => {
        try {
            await blogService.remove({ id })
            dispatch(removeBlog({ id }))
        } catch (error) {
            // Notify user if blog could not be deleted
            dispatch(notification('Blog could not be deleted'))
        }
    }
}

export const { addBlog, removeBlog, replaceBlog, appendBlog } =
    blogSlice.actions
export default blogSlice.reducer

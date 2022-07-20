/** @format */

// Get token from local storage
export const getToken = () =>
    JSON.parse(window.localStorage.getItem('blogging-token')) || null

// Save token to local storage
export const setToken = token =>
    window.localStorage.setItem('blogging-token', JSON.stringify(token))

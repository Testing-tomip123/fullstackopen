/** @format */

import instance from '../config/axios'

// Url for the login
const loginUrl = 'login'

/**
 * Login function
 * @param {Object} credentials - The credentials object
 * @return {Promise} the response data
 */
const login = async credentials => {
    const response = await instance.post(loginUrl, credentials)
    return response.data
}

/**
 * Exports the login function
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
}

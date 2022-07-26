/** @format */

import instance from '../config/axios'

const usersUrl = 'users'

/**
 * Get all the users
 * @returns {Promise}
 */
const getAll = async () => {
    const response = await instance.get(usersUrl)
    return response.data
}

/**
 * Get one user
 * @param id
 * @returns {Promise}
 */
const oneUser = id => {
    const response = instance.get(`${usersUrl}/${id}`)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    oneUser,
}

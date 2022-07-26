/** @format */

import instance from '../config/axios'

const blogsUrl = 'blogs'

/**
 * Get all the blogs from the server
 */
const getAll = () => {
    const request = instance.get(blogsUrl)
    return request.then(response => response.data)
}

/**
 * Create a blog on the server
 * @param {Object} payload
 */
const create = payload => {
    const request = instance.post(blogsUrl, payload)
    return request.then(response => response.data)
}

/**
 * Update a blog on the server
 * @param {Object} payload
 */
const update = payload => {
    const request = instance.put(`${blogsUrl}/${payload.id}`, payload)
    return request.then(response => response.data)
}

/**
 * Delete a blog on the server
 * @param {Object} payload
 */
const remove = payload => {
    const request = instance.delete(`${blogsUrl}/${payload.id}`)
    return request.then(response => response.data)
}

/**
 * Add a comment to a blog
 * @param {Object} payload
 */
const comment = ({ id, comment }) => {
    const request = instance.post(`${blogsUrl}/${id}/comment`, { comment })
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    create,
    update,
    remove,
    comment,
}

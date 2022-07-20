/** @format */

import axios from 'axios'
import { getToken } from '../utils'

// Create an instance of axios with the base URL
const instance = axios.create({
    baseURL: '/api/',
})

// Intercept request and add the token to the header. It will be used in all the request
instance.interceptors.request.use(
    config =>
        getToken()
            ? {
                  ...config,
                  headers: { Authorization: `Bearer ${getToken().token}` },
              }
            : config,
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default instance

/** @format */

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { login } from '../reducers/authReducer'
import { notification } from '../reducers/notificationReducer'

const Login = () => {
    // Dispatch is used to dispatch actions to the reducer
    const dispatch = useDispatch()

    // Navigate is used to navigate to other pages
    const navigate = useNavigate()

    // UseField is used to create a field
    const { default: username, reset: resetUsername } = useField('text')
    const { default: password, reset: resetPassword } = useField('password')

    // Clear form is used to clear the form
    const clearForm = () => {
        resetUsername()
        resetPassword()
    }

    // HandleSubmit is used to handle the submit event
    const handleSubmit = async event => {
        event.preventDefault()
        dispatch(login({ username: username.value, password: password.value }))
        dispatch(notification(`Welcome ${username.value}`))
        clearForm()
        navigate('/')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                Username:
                <input {...username} />
                Password:
                <input {...password} />
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login

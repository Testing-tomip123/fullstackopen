/** @format */

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { login } from '../reducers/authReducer'
import { notification } from '../reducers/notificationReducer'

import { Button, Form } from 'react-bootstrap'

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
        <div className="login">
            <h2 className="login-header">Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        {...username}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        {...password}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login

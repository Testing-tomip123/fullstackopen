/** @format */

import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [update, setUpdate] = useState(null)
    const [user, setUser] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [update])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }, [message])

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setMessage({ content: `Welcome ${user.name}`, type: 'success' })
        } catch (exception) {
            setMessage({
                content: 'Wrong username or password',
                type: 'error',
            })
        }
    }
    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        setMessage({ content: `Logged out ${user.name}`, type: 'success' })
    }

    const createBlog = async blogObject => {
        try {
            blogFormRef.current.toggleVisibility()
            const response = await blogService.create(blogObject)
            setBlogs(blogs.concat(response))
            setMessage({
                content: `A new blog ${response.title} by ${response.author} added`,
                type: 'success',
            })
        } catch (exception) {
            setMessage({ content: 'Error adding blog', type: 'error' })
        }
    }

    const loginForm = () => (
        <Togglable buttonLabel="login">
            <LoginForm
                handleSubmit={handleLogin}
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
            />
        </Togglable>
    )

    const userLogged = () => (
        <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
        </div>
    )

    const blogForm = () => (
        <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
        </Togglable>
    )

    const handelLike = async (id, likes) => {
        await blogService.update({
            id: id,
            likes: likes + 1,
        })
        setUpdate(Math.random())
    }

    const handleDelete = async blog => {
        if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
            await blogService.remove({
                id: blog.id,
            })
            setUpdate(Math.random())
            setMessage({
                content: `Blog ${blog.title} by ${blog.author} deleted`,
                type: 'success',
            })
        }
    }

    return (
        <div>
            <Notification message={message} />
            {user === null ? (
                <div>
                    <h2>Log in to application</h2>
                    {loginForm()}
                </div>
            ) : (
                <div>
                    <h2>Blogs</h2>
                    {userLogged()}
                    {blogForm()}
                    {blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)) &&
                        blogs.map(blog => (
                            <Blog
                                key={blog.id}
                                blog={blog}
                                handleLike={handelLike}
                                handleDelete={handleDelete}
                            />
                        ))}
                </div>
            )}
        </div>
    )
}

export default App

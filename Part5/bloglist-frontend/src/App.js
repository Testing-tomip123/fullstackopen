import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={`notification notification-${message.type}`}>
            {message.content}
        </div>
    )
}

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBloglistUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setMessage({
                type: 'success',
                content: `${user.name} logged in`
            })
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (exception) {
            setMessage({
                type: 'error',
                content: 'Wrong credentials'
            })
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBloglistUser')
        setMessage({
            type: 'success',
            content: 'Logged out'
        })
        setTimeout(() => {
            setMessage(null)
        }, 5000)
        setUser(null)
    }

    const handleCreate = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
        }

        try {
            const returnedBlog = await blogService.create(newBlog)
            setBlogs(blogs.concat(returnedBlog))
            event.target.title.value = ''
            event.target.author.value = ''
            event.target.url.value = ''
            setMessage({
                type: 'success',
                content: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
            })
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (exception) {
            setMessage({
                type: 'error',
                content: 'Error adding blog'
            })
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleLike = async (blog) => {
        const likedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id,
        }

        try {
            const returnedBlog = await blogService.update(blog.id, likedBlog)
            setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
        } catch (exception) {
            console.log(exception)
        }
    }

    const handleRemove = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            try {
                await blogService.remove(blog.id)
                setBlogs(blogs.filter(b => b.id !== blog.id))
            } catch (exception) {
                console.log(exception)
            }
        }
    }

    const loginForm = () => (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    const blogForm = () => (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={handleCreate}>
                <div>
                    title
                    <input
                        id="title"
                        type="text"
                        name="Title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        id="author"
                        type="text"
                        name="Author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        id="url"
                        type="text"
                        name="Url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )

    const blogList = () => (
        <div>
            <h2>Blogs</h2>
            <div>
                {blogs.map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLike={handleLike}
                        handleRemove={handleRemove}
                    />
                )}
            </div>
        </div>
    )

    const userLogged = () => (
        <div>
            <h2>{user.name} logged in</h2>
            <button onClick={handleLogout}>logout</button>
        </div>
    )

    return (
        <div>
            <h1>Bloglist</h1>
            <Notification message={message} />
            {user === null ? loginForm() : userLogged()}
            {user === null ? null : blogForm()}
            {user === null ? null : blogList()}
        </div>
    )
}

export default App
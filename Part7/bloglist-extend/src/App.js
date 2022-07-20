/** @format */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom'

import { initializeAuth, logout } from './reducers/authReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { getUser } from './reducers/userReducer'

import Login from './components/Login'
import Nav from './components/Navbar'

// Home page
const Home = () => {
    return (
        <div>
            <h2>Blogs</h2>
            <ul>
                <li>
                    <Link to="/blogs/1">Blog 1</Link>
                </li>
                <li>
                    <Link to="/blogs/2">Blog 2</Link>
                </li>
            </ul>
        </div>
    )
}

// The main app
const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)
    const auth = useSelector(state => state.auth)

    const loggedIn = auth && 'token' in auth

    // Initialize the auth when the app starts
    useEffect(() => {
        dispatch(initializeAuth())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // If not logged in, don't do anything
        if (!loggedIn) {
            return null
        }
        // Initialize the blogs and fetch the user
        dispatch(initializeBlogs())
        dispatch(getUser(auth.username))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn])

    // Logoff the user
    const logoff = () => {
        dispatch(logout())
        navigate('/')
    }

    // Get the user from the URL
    const userMatch = useMatch('/users/:id')

    // If there is a user, get it from the users
    // Otherwise set it to null
    const user = userMatch
        ? users.find(user => user.id === userMatch.params.id)
        : null

    // Get the blog from the URL
    const blogMatch = useMatch('/blogs/:id')

    // If there is a blog, get it from blogs
    // Otherwise set it to null
    const blog = blogMatch
        ? blogs.find(blog => blog.id === blogMatch.params.id)
        : null

    return (
        <div className="App">
            <Nav user={auth} logoff={logoff} />
            <div className="content">
                <h2 className="text-2xl">{loggedIn ? 'Blogs' : 'Login'}</h2>
                <Routes>
                    <Route path="/" element={loggedIn ? <Home /> : <Login />} />
                </Routes>
            </div>
        </div>
    )
}
export default App

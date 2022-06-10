/** @format */

import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {
    const [showFull, setShowFull] = useState(false)

    const blogStyle = {
        padding: '10px',
        border: 'solid',
        borderWidth: '1px',
        marginBottom: '5px',
        borderRadius: '5px',
        backgroundColor: '#f2f2f2',
        fontSize: '1.2rem',
    }

    const toggleVisibility = () => {
        setShowFull(!showFull)
    }

    return (
        <div style={blogStyle} className="blog">
            {showFull ? (
                <div>
                    <h3>{blog.title}</h3>
                    <p>{blog.author}</p>
                    <p>{blog.url}</p>
                    <p>
                        likes {blog.likes}
                        <button
                            className="like"
                            onClick={() => handleLike(blog.id, blog.likes)}
                        >
                            like
                        </button>
                    </p>
                    <p>
                        {blog.user.name}
                        <button
                            className="delete"
                            onClick={() => handleDelete(blog)}
                        >
                            remove
                        </button>
                    </p>
                    <p>
                        <button onClick={toggleVisibility}>hide</button>
                    </p>
                </div>
            ) : (
                <div>
                    <h3>{blog.title}</h3>
                    <p>{blog.author}</p>
                    <button onClick={toggleVisibility}>show</button>
                </div>
            )}
        </div>
    )
}

Blog.propTypes = {
    setUpdate: PropTypes.func,
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
    }),
}

export default Blog

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
    <div style={blogStyle}>
      {showFull ? (
        <div>
          <h3>{blog.title}</h3>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={() => handleLike(blog.id, blog.likes)}>
              like
            </button>
          </p>
          <p>
            {blog.user.name}
            <button onClick={() => handleDelete(blog)}>remove</button>
          </p>
        </div>
      ) : (
        <div>
          <h3>{blog.title}</h3>
          <button onClick={toggleVisibility}>show</button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  setUpdate: PropTypes.func.isRequired,
  blogs: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}



export default Blog
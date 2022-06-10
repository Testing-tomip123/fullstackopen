/** @format */

import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState('')

    const handleTitleChange = event => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = event => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = event => {
        setUrl(event.target.value)
    }

    const handleLikesChange = event => {
        setLikes(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        createBlog({
            title,
            author,
            url,
            likes: Number(likes),
        })
        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes('')
    }

    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title
                    <input
                        id="title"
                        type="text"
                        name="Title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author
                    <input
                        id="author"
                        type="text"
                        name="Author"
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url
                    <input
                        id="url"
                        type="text"
                        name="Url"
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <div>
                    likes
                    <input
                        id="likes"
                        type="text"
                        name="Likes"
                        value={likes}
                        onChange={handleLikesChange}
                    />
                </div>
                <button id="create-button" type="submit">
                    create
                </button>
            </form>
        </div>
    )
}

export default BlogForm

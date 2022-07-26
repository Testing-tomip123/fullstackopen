/** @format */

import { useDispatch } from 'react-redux'
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { useSelector } from 'react-redux'
import { notification } from '../reducers/notificationReducer'

import { Button, Card, Form, Container } from 'react-bootstrap'

const BlogDetails = ({ blog }) => {
    const { default: comment, reset: resetComment } = useField('text')
    const user = useSelector(state => state.auth.username)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLike = () => {
        dispatch(likeBlog(blog.id))
    }
    const handleDelete = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            dispatch(deleteBlog(blog.id))
            dispatch(notification(`Blog ${blog.title} deleted`))
            navigate('/')
        }
    }
    const handleComment = event => {
        event.preventDefault()
        dispatch(commentBlog({ id: blog.id, comment: comment.value }))
        resetComment()
    }

    return (
        <div>
            {blog ? (
                <Container
                    className="blog-details"
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                    <Card className="blog-card" style={{ width: '100%' }}>
                        <Card.Body
                            className="blog-card-body"
                            style={{ padding: '10px' }}
                        >
                            <Card.Title className="blog-headline">
                                <p className="title">{blog.title}</p>
                                <p className="author">by {blog.author}</p>
                            </Card.Title>
                            <Card.Text className="url">
                                <a href={blog.url}>Read more</a>
                            </Card.Text>
                            <Card.Text className="likes">
                                {blog.likes} likes
                                <Button
                                    className="like-btn"
                                    onClick={handleLike}
                                    style={{
                                        fontSize: '0.9rem',
                                        paddingInline: '0.5rem',
                                        marginLeft: '10px',
                                    }}
                                >
                                    like
                                </Button>
                            </Card.Text>

                            <Card.Text className="added-by">
                                added by {blog.user.username}
                            </Card.Text>
                            {user === blog.user.username && (
                                <Button
                                    className="delete-btn"
                                    style={{
                                        border: '1px solid red',
                                        fontSize: '0.9rem',
                                        maxWidth: '80px',
                                        marginTop: '5px',
                                    }}
                                    onClick={handleDelete}
                                >
                                    Remove
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="blog-card" style={{ width: '100%' }}>
                        <Card.Body
                            className="blog-card-body"
                            style={{ padding: '10px' }}
                        >
                            <Card.Title
                                className="blog-headline"
                                style={{ margin: '10px' }}
                            >
                                Comments
                            </Card.Title>
                            <Card.Text className="comments">
                                {blog.comments.map(comment => (
                                    <li className="comment" key={comment}>
                                        {comment}
                                    </li>
                                ))}
                            </Card.Text>
                            <Card.Text className="comment-form">
                                <Form onSubmit={handleComment}>
                                    <Form.Group controlId="comment">
                                        <Form.Control
                                            style={{
                                                width: '200px',
                                                padding: '5px',
                                            }}
                                            type="text"
                                            id="comment"
                                            {...comment}
                                        />
                                    </Form.Group>
                                    <Button
                                        type="submit"
                                        style={{ marginTop: '10px' }}
                                    >
                                        comment
                                    </Button>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            ) : (
                <Container
                    className="blog-not-found"
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                    <Card className="blog-card" style={{ width: '100%' }}>
                        <Card.Body
                            className="blog-card-body"
                            style={{ padding: '10px' }}
                        >
                            <Card.Title className="blog-headline">
                                <p
                                    className="title"
                                    style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Blog not found
                                </p>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Container>
            )}
        </div>
    )
}

export default BlogDetails

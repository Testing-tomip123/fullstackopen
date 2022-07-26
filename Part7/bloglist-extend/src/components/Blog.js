/** @format */

import { Link } from 'react-router-dom'

import { Card } from 'react-bootstrap'

const Blog = ({ blog }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {blog.author}
                </Card.Subtitle>
                <Card.Text>
                    <Card.Link as={Link} to={`/blogs/${blog.id}`}>
                        Read more...
                    </Card.Link>
                </Card.Text>
                <Card.Text>
                    <Card.Text>
                        <span className="likes">{blog.likes || 0} likes</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="comments">
                            {blog.comments.length || 0} comments
                        </span>
                    </Card.Text>
                    <Card.Text>
                        <span className="added-by">
                            Added by {blog.user.username}
                        </span>
                    </Card.Text>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Blog

/** @format */

import { Link } from 'react-router-dom'

import { Card, ListGroup } from 'react-bootstrap'

const UserDetails = ({ user }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Added blogs:
                </Card.Subtitle>

                <ListGroup variant="flush">
                    {user.blogs.map(blog => (
                        <ListGroup.Item
                            key={blog.id}
                            as={Link}
                            to={`/blogs/${blog.id}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'blue',
                            }}
                        >
                            {blog.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default UserDetails

/** @format */

import { useRef } from 'react'
import AddBlog from './AddBlog'
import Togglable from './Togglable'
import BlogList from './BlogList'

import { Card, CardGroup, ListGroup, ListGroupItem } from 'react-bootstrap'

const Home = () => {
    const blogFormRef = useRef()

    return (
        <div className="container">
            <h2 className="text-center">Blogs</h2>
            <div>
                <Togglable buttonLabel="New Post" ref={blogFormRef}>
                    <AddBlog toggleRef={blogFormRef} />
                </Togglable>
            </div>
            <br />
            <CardGroup>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <h3>Blogs</h3>
                        </Card.Title>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <BlogList />
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    )
}

export default Home

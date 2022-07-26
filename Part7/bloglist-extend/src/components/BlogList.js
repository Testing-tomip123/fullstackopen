/** @format */

import { useSelector } from 'react-redux'
import Blog from './Blog'

import { Row, Col, Container } from 'react-bootstrap'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)

    const sortPosts = arr => {
        return arr.map(a => a).sort((a, b) => b.likes - a.likes)
    }

    return (
        <div className="blogs">
            <Container>
                <Row>
                    {sortPosts(blogs).map(blog => (
                        <Col key={blog.id} xs={12} md={6}>
                            <Blog key={blog.id} blog={blog} className="blog" />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default BlogList

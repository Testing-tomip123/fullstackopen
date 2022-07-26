/** @format */

import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { notification } from '../reducers/notificationReducer'

import { Button, Form, Container, Card, Col, Row } from 'react-bootstrap'

const AddBlog = ({ toggleRef }) => {
    const dispatch = useDispatch()
    const { default: title, reset: titleReset } = useField('text')
    const { default: author, reset: authorReset } = useField('text')
    const { default: url, reset: urlReset } = useField('text')

    const clearForm = () => {
        titleReset()
        authorReset()
        urlReset()
        toggleRef.current.toggleVisibility()
    }

    const handleSubmit = event => {
        event.preventDefault()
        dispatch(
            createBlog({
                title: title.value,
                author: author.value,
                url: url.value,
            })
        )
        clearForm()
        dispatch(notification('New blog created successfully'))
    }

    return (
        <Container className="p-3">
            <Card>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit} className="form">
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    {...title}
                                />
                            </Form.Group>
                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <Form.Group controlId="author">
                                        <Form.Label>Author</Form.Label>

                                        <Form.Control type="text" {...author} />
                                    </Form.Group>
                                </Col>
                                <Col md="auto">
                                    <Form.Group controlId="url">
                                        <Form.Label>Url</Form.Label>

                                        <Form.Control type="text" {...url} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>{' '}
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default AddBlog

/** @format */

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../reducers/usersReducer'

import { Card, ListGroup, Button } from 'react-bootstrap'

const UserList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (
        <div className="container">
            <h3>Users</h3>

            {users.map(user => (
                <Card key={user.username} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title
                            as="p"
                            className="text-center"
                        >{`${user.name} (${user.username})`}</Card.Title>

                        <ListGroup variant="flush">
                            <ListGroup.Item>{`${user.blogs.length} blogs created`}</ListGroup.Item>
                        </ListGroup>

                        <Button
                            variant="primary"
                            as={Link}
                            to={`/users/${user.id}`}
                            block
                            className="mt-3"
                        >
                            View user's blogs
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

export default UserList

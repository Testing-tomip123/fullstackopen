/** @format */

import { Container, Navbar, Nav, Button } from 'react-bootstrap'

const NavbarComponent = ({ user, logoff }) => {
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            bg="dark"
            variant="dark"
            style={{ flex: '1', fixed: 'top' }}
        >
            <Container>
                <Navbar.Brand href="/">Bloglist</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {user && (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'white',
                                }}
                            >
                                {user.username} logged in{' '}
                                <Button
                                    variant="outline-light"
                                    onClick={logoff}
                                    className="text-sm"
                                    style={{ marginLeft: '1rem' }}
                                >
                                    Logout
                                </Button>{' '}
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent

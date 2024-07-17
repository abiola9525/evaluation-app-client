// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = ({ isAuthenticated, isAdmin, user, onLogout }) => {
    const navigate = useNavigate();

    const displayName = user ? `${user.first_name} ${user.last_name}` : 'User';
    
    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Evaluation App</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/module">
                            <Nav.Link>Module</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/program">
                            <Nav.Link>Program</Nav.Link>
                        </LinkContainer>
                        {isAdmin && (
                            <LinkContainer to="/admin">
                                <Nav.Link>Admin</Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                    <Nav className="ml-auto">
                        {isAuthenticated ? (
                            <NavDropdown title={displayName} id="basic-nav-dropdown">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <LinkContainer to="/login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <Nav.Link>Register</Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;

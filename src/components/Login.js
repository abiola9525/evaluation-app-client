// src/components/Login.js
import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post('/account/token/', credentials)
            .then(response => {
                localStorage.setItem('token', response.data.access);
                onLogin();  // Call the handleLogin function to update the state
                toast.success('Login Successful');
                setTimeout(() => {
                    navigate('/');
                }, 2000); // Redirect after 2 seconds
            })
            .catch(error => {
                toast.error('Login failed. Please check your credentials.');
                console.error('Login error:', error);
            });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4">
                        <h2 className="mb-4 text-center">Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Enter username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <ToastContainer position="top-center" autoClose={2000} />
        </Container>
    );
};

export default Login;

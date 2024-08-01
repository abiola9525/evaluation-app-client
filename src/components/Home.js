// src/components/Module.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaEdit } from 'react-icons/fa';
import './Home.css'; // Ensure the CSS file is created

const Module = () => {
    const [modules, setModules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/module/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setModules(response.data);
            } catch (error) {
                console.error('There was an error fetching the modules!', error);
            }
        };

        fetchModules();
    }, []);

    const handleRowClick = (moduleCode) => {
        navigate(`/module/${moduleCode}/review/add`);
    };

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">Modules</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover className="module-table shadow-sm">
                        <thead>
                            <tr>
                                <th>Module Code</th>
                                <th>Module Name</th>
                                <th>Module Leader</th>
                                <th>Completed By</th>
                                <th>Completed</th>
                                <th>Action</th>
                                <th>Previous Review</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {modules.map(module => (
                                <tr key={module.id}>
                                    <td>{module.module_code}</td>
                                    <td>{module.module_name}</td>
                                    <td>{module.module_leader}</td>
                                    <td>{module.module_reviews.length > 0 ? module.module_reviews[0].completed_by : 'N/A'}</td>
                                    <td>
                                        {module.module_reviews.length > 0 && module.module_reviews[0].completed ? (
                                            <FaCheckCircle className="icon-completed" />
                                        ) : (
                                            <FaTimesCircle className="icon-not-completed" />
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleRowClick(module.module_code)}
                                            className="d-flex align-items-center"
                                        >
                                            <FaEdit className="mr-2" /> Review
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleRowClick(module.module_code)}
                                            className="d-flex align-items-center"
                                        >
                                            <FaEdit className="mr-2" /> View Previous Review
                                        </Button>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Module;

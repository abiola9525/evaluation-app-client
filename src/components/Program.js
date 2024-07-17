// src/components/Program.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaEdit } from 'react-icons/fa';
import './Program.css'; // Ensure the CSS file is created

const Program = () => {
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/program/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPrograms(response.data);
            } catch (error) {
                console.error('There was an error fetching the programs!', error);
            }
        };

        fetchPrograms();
    }, []);

    const handleRowClick = (programCode) => {
        navigate(`/program/${programCode}/review/add`);
    };

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">Programs</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover className="program-table shadow-sm">
                        <thead>
                            <tr>
                                <th>Program Code</th>
                                <th>Program Name</th>
                                <th>Program Leader</th>
                                <th>Completed By</th>
                                <th>Completed</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.map(program => (
                                <tr key={program.id}>
                                    <td>{program.program_code}</td>
                                    <td>{program.program_name}</td>
                                    <td>{program.program_leader}</td>
                                    <td>{program.program_reviews.length > 0 ? program.program_reviews[0].completed_by : 'N/A'}</td>
                                    <td>
                                        {program.program_reviews.length > 0 && program.program_reviews[0].completed ? (
                                            <FaCheckCircle className="icon-completed" />
                                        ) : (
                                            <FaTimesCircle className="icon-not-completed" />
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleRowClick(program.program_code)}
                                            className="d-flex align-items-center"
                                        >
                                            <FaEdit className="mr-2" /> Review
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

export default Program;

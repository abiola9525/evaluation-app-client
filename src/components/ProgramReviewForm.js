// src/components/ProgramReviewForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Form, Button } from 'react-bootstrap';
import './ReviewForm.css';

const ProgramReviewForm = () => {
    const { programCode } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        program_details: '',
        academic_year: '',
        school: '',
        student_nap: '',
        evolution_to_teaching: '',
        evolution_of_op_program: '',
        inclusive_nature_of_curriculum: '',
        past_changes: '',
        other_comment: '',
        future_changes: '',
        completed_by: '',
    });
    const [academicYears, setAcademicYears] = useState([]);

    useEffect(() => {
        const fetchAcademicYears = async () => {
            try {
                const response = await axiosInstance.get('http://127.0.0.1:8000/api/academic-years/');
                setAcademicYears(response.data);
            } catch (error) {
                console.error('Error fetching academic years:', error);
            }
        };

        fetchAcademicYears();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`program/${programCode}/review/`, formData);
            toast.success(`Evaluation form for program ${programCode} has been filled successfully`);
            setTimeout(() => {
                navigate('/program');
            }, 3000); // Redirect after 3 seconds
        } catch (error) {
            toast.error('There was an error submitting the evaluation!');
            console.error('Error submitting review:', error);
        }
    };

    return (
        <Container className="mt-5 module-review-form-container">
            <h2 className="mb-4 text-center">Submit Review for Progrma {programCode}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="programDetails">
                    <Form.Label>Program Details</Form.Label>
                    <Form.Control
                        type="text"
                        name="program_details"
                        placeholder="Enter program details"
                        value={formData.program_details}
                        onChange={handleChange}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Form.Group controlId="academicYear">
                    <Form.Label>Academic Year</Form.Label>
                    <Form.Control
                        as="select"
                        name="academic_year"
                        value={formData.academic_year}
                        onChange={handleChange}
                        className="form-control-custom"
                    >
                        <option value="">Select academic year</option>
                        {academicYears.map((academic_year) => (
                            <option key={academic_year.id} value={academic_year.id}>
                                {academic_year.academic_year}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="school">
                    <Form.Label>School</Form.Label>
                    <Form.Control
                        type="text"
                        name="school"
                        placeholder="Enter School"
                        value={formData.school}
                        onChange={handleChange}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Form.Group controlId="studentNAP">
                    <Form.Label>Student Numbers, Achievement and Progression</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="student_nap"
                        placeholder="Enter Student numbers, achievement and progression"
                        value={formData.student_nap}
                        onChange={handleChange}
                        rows={2}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Form.Group controlId="evolutionOfOpProgram">
                    <Form.Label>Evaluation of the operation of the Program</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="evolution_of_op_program"
                        placeholder="Enter evaluation of the operation of the Program"
                        value={formData.evolution_of_op_program}
                        onChange={handleChange}
                        rows={4}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Form.Group controlId="evolutionToTeaching">
                    <Form.Label>Evaluation of approach to teaching, assessment and feedback</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="evolution_to_teaching"
                        placeholder="Enter evaluation to teaching"
                        value={formData.evolution_to_teaching}
                        onChange={handleChange}
                        rows={4}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Form.Group controlId="inclusiveNatureOfCurriculum">
                    <Form.Label>Inclusive Nature of the Curriculum</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="inclusive_nature_of_curriculum"
                        placeholder="Enter the inclusive nature of curriculum"
                        value={formData.inclusive_nature_of_curriculum}
                        onChange={handleChange}
                        rows={4}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Form.Group controlId="pastChanges">
                    <Form.Label>Effect of Past Changes</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="past_changes"
                        placeholder="Enter past changes"
                        value={formData.past_changes}
                        onChange={handleChange}
                        rows={4}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Form.Group controlId="futureChanges">
                    <Form.Label>Proposed Future Changes</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="future_changes"
                        placeholder="Enter future changes"
                        value={formData.future_changes}
                        onChange={handleChange}
                        rows={4}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Form.Group controlId="otherComment">
                    <Form.Label>Other Comments</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="other_comment"
                        placeholder="Enter Comment"
                        value={formData.other_comment}
                        onChange={handleChange}
                        rows={4}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Form.Group controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="completed_by"
                        placeholder="Enter your Name"
                        value={formData.completed_by}
                        onChange={handleChange}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="btn-custom">
                    Submit Review
                </Button>
            </Form>
            <ToastContainer />
        </Container>
    );
};

export default ProgramReviewForm;

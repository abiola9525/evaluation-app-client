// PreviousReview.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PreviousReview.css'; // You'll need to create this CSS file

const PreviousReview = () => {
    const [review, setReview] = useState(null);
    const [module, setModule] = useState(null);
    const { moduleCode } = useParams();

    useEffect(() => {
        const fetchPreviousReview = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/module/${moduleCode}/previous-review/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setReview(response.data.review);
                setModule(response.data.module);
            } catch (error) {
                console.error('Error fetching previous review:', error);
            }
        };

        fetchPreviousReview();
    }, [moduleCode]);

    if (!review || !module) return <div>Loading...</div>;

    return (
        <div className="page-wrapper">
            <div className="wrapper wrapper--w790">
                <div className="module-details-container">
                    <h2>Annual Module Quality Enhancement Report for {review.academic_year}</h2>
                    <table className="module-details-table">
                        <tbody>
                            <tr>
                                <th>1. Module details</th>
                                <td>{module.module_code} {module.module_name}</td>
                            </tr>
                            <tr>
                                <th>2. Academic Year</th>
                                <td>{review.academic_year}</td>
                            </tr>
                            <tr>
                                <th>3. School</th>
                                <td>{review.school}</td>
                            </tr>
                            <tr>
                                <th>4. Module Leader/Organiser</th>
                                <td>{module.module_leader}</td>
                            </tr>
                            <tr>
                                <th>5. Student Numbers, Achievement and Progression</th>
                                <td>{review.student_nap}</td>
                            </tr>
                            <tr>
                                <th>6. Evaluation of operation of the module</th>
                                <td>{review.evolution_of_op_module}</td>
                            </tr>
                            <tr>
                                <th>7. Evolution of approach to teaching, assessment and feedback</th>
                                <td>{review.evolution_to_teaching}</td>
                            </tr>
                            <tr>
                                <th>8. Inclusive Nature of the Curriculum</th>
                                <td>{review.inclusive_nature_of_curriculum}</td>
                            </tr>
                            <tr>
                                <th>9. Effect of Past Changes</th>
                                <td>{review.past_changes}</td>
                            </tr>
                            <tr>
                                <th>10. Proposed Future Changes</th>
                                <td>{review.future_changes}</td>
                            </tr>
                            <tr>
                                <th>11. Other Comment</th>
                                <td>{review.other_comment}</td>
                            </tr>
                            <tr>
                                <th rowSpan="2">12. Author and Date</th>
                                <td>{review.completed_by}</td>
                            </tr>
                            <tr>
                                <td>{review.completion_date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <Link to="/admin/modules" className="btn btn--radius-2 btn--blue">Back to Modules List</Link>
                </div>
            </div>
        </div>
    );
};

export default PreviousReview;
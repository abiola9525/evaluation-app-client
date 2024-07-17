// src/components/Front.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Front.css'; // Import the CSS file

const Front = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    const handleModuleClick = () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/module');
        }
    };

    const handleProgramClick = () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/program');
        }
    };

    return (
        <div>
            {/* Header Section */}
            <header className="header-section">
                <div className="container text-center">
                    <h1>Module and Program Evaluation</h1>
                    <p>Explore, evaluate, and improve educational modules and programs with comprehensive feedback.</p>
                    <div className="buttons">
                        <button className="btn btn-gradient" onClick={handleModuleClick}>
                            View Modules
                        </button>
                        <button className="btn btn-gradient" onClick={handleProgramClick}>
                            View Programs
                        </button>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4">
                            <div className="feature-box">
                                <h3>Detailed Feedback</h3>
                                <p>Provide and receive in-depth evaluations on various modules and programs.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-box">
                                <h3>User-Friendly Interface</h3>
                                <p>Navigate through a sleek and intuitive interface designed for ease of use.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-box">
                                <h3>Real-Time Analytics</h3>
                                <p>Access real-time data and analytics to make informed decisions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
                <div className="container text-center">
                    <h2>Join Our Community</h2>
                    <p>Become a part of a growing community focused on enhancing educational experiences.</p>
                    <button className="btn btn-gradient" onClick={handleModuleClick}>
                        Get Started
                    </button>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer-section">
                <div className="container text-center">
                    <p>&copy; 2024 Module and Program Evaluation. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Front;

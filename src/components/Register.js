// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        gender: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/account/register/', formData);
            console.log(response.data);
            setError('');
            setSuccess('Registration successful');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.detail || 'Registration failed');
            } else {
                setError('An error occurred. Please try again.');
            }
            setSuccess('');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input className="form-control" type="text" name="username" placeholder="Username" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input className="form-control" type="email" name="email" placeholder="Email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input className="form-control" type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input className="form-control" type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input className="form-control" type="text" name="gender" placeholder="Gender" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
    );
};

export default Register;

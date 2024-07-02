// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/account/login/', formData);
            console.log(response.data);
            setError('');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.detail || 'Login failed');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input className="form-control" type="text" name="username" placeholder="Username" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default Login;

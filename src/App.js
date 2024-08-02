import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Front from './components/Front';
import Module from './components/Home';
import Program from './components/Program';
import Admin from './components/Admin';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ModuleReviewForm from './components/ModuleReviewForm';
import ProgramReviewForm from './components/ProgramReviewForm'; 
import PreviousReview from './components/PreviousReview';
import NavbarComponent from './components/Navbar';
import axiosInstance from './axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axiosInstance.get('/account/');
                setUser(response.data);
                setIsAuthenticated(true);
                setIsAdmin(response.data.is_admin);
            } catch (error) {
                console.error('There was an error fetching the user data!', error);
                setIsAuthenticated(false);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleLogin = () => {
        fetchUserData();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        setIsAdmin(false);
    };

    return (
        <Router>
            <NavbarComponent isAuthenticated={isAuthenticated} isAdmin={isAdmin} user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Front isAuthenticated={isAuthenticated} />} />
                <Route path="/module" element={isAuthenticated ? <Module /> : <Navigate to="/login" />} />
                <Route path="/program" element={isAuthenticated ? <Program /> : <Navigate to="/login" />} />
                <Route path="/program/:programCode/review/add" element={<ProgramReviewForm />} />
                {isAdmin && <Route path="/admin" element={<Admin />} />}
                {!isAuthenticated && <Route path="/login" element={<Login onLogin={handleLogin} />} />}
                {!isAuthenticated && <Route path="/register" element={<Register />} />}
                {isAuthenticated && <Route path="/profile" element={<Profile user={user} />} />}
                <Route path="/module/:moduleCode/previous-review" element={<PreviousReview />} />
                <Route path="/module/:moduleCode/review/add" element={<ModuleReviewForm />} />
            </Routes>
        </Router>
    );
};

export default App;

// src/components/Profile.js
import React from 'react';

const Profile = ({ user, isAdmin }) => {
    return (
        <div className="container mt-5">
            <h2>User Profile</h2>
            <div>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>First Name:</strong> {user.first_name}</p>
                <p><strong>Last Name:</strong> {user.last_name}</p>
            </div>
        </div>
    );
};

export default Profile;

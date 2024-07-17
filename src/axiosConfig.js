// src/axiosConfig.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                try {
                    const tokenParts = jwtDecode(refreshToken);

                    const now = Math.ceil(Date.now() / 1000);
                    if (tokenParts.exp > now) {
                        const response = await axiosInstance.post('/token/refresh/', { refresh: refreshToken });
                        localStorage.setItem('token', response.data.access);
                        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
                        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
                        return axiosInstance(originalRequest);
                    } else {
                        console.error('Refresh token is expired', tokenParts.exp, now);
                        window.location.href = '/login/';
                    }
                } catch (err) {
                    console.error('Error during token refresh:', err);
                    window.location.href = '/login/';
                }
            } else {
                console.error('No refresh token available');
                window.location.href = '/login/';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

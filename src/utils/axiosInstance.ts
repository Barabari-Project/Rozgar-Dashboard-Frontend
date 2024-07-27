// axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`, // Replace with your backend API base URL
});

// Request interceptor to add the JWT token to the Authorization header
axiosInstance.interceptors.request.use((config) => {
    console.log(import.meta.env.VITE_BACKEND_BASE_URL)
    const token = Cookies.get('token'); // Assuming you store the token in localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;

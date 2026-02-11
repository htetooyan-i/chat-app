import axios from 'axios';
import { error } from 'console';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

api.interceptors.request.use((config) => {

    if (config.headers?.skipAuth) return config;
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    
    return config;
});

// OPTIONAL: Change response to just .data, now need to use .data.data because of the API response structure in backend
// api.interceptors.response.use(
//     (response) => response.data?.data ?? response.data,
//     (error) => Promise.reject(error)
// );


export default api;

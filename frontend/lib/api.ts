import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
});

// api.interceptors.request.use((config) => {

//     if (config.headers?.skipAuth) return config;
//     const token = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('accessToken='))
//         ?.split('=')[1];

//     if (token) config.headers['Authorization'] = `Bearer ${token}`;
    
//     return config;
// });

// OPTIONAL: Change response to just .data, now need to use .data.data because of the API response structure in backend
// api.interceptors.response.use(
//     (response) => response.data?.data ?? response.data,
//     (error) => Promise.reject(error)
// );

// Track if we're currently refreshing
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

// Process queued requests after refresh
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// OPTIONAL: Request interceptor - refresh before expiry
// api.interceptors.request.use(
//   async (config) => {
//     // Skip for refresh endpoint
//     if (config.url?.includes('/refresh-access-token')) {
//       return config;
//     }

//     try {
//       // Get token expiry from cookie (if you store it)
//       // Or check a stored timestamp
//       const tokenExpiry = localStorage.getItem('tokenExpiry');
      
//       if (tokenExpiry) {
//         const expiryTime = new Date(tokenExpiry).getTime();
//         const now = Date.now();
//         const timeUntilExpiry = expiryTime - now;

//         // If token expires in less than 2 minutes, refresh it
//         if (timeUntilExpiry < 2 * 60 * 1000) {
//           await axios.post(
//             'http://localhost:4000/api/auth/refresh-access-token',
//             {},
//             { withCredentials: true }
//           );

//           // Update expiry time
//           const newExpiry = new Date(Date.now() + 15 * 60 * 1000);
//           localStorage.setItem('tokenExpiry', newExpiry.toISOString());
//         }
//       }
//     } catch (error) {
//       console.error('Proactive refresh failed:', error);
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response interceptor - handles token refresh
api.interceptors.response.use(
  (response) => {
    // If response is successful, just return it
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {

        if (originalRequest.url?.includes('/auth')) {
            return Promise.reject(error);
        }
      
        // If already refreshing, queue this request
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
            .then(() => {
                return api(originalRequest);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            // Request new access token
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/refresh-access-token`,
                {},
                { withCredentials: true }
            );

            // Refresh successful, process queued requests
            processQueue(null, null);
            
            // Retry original request
            return api(originalRequest);

        } catch (refreshError) {
            // Refresh failed - logout user
            processQueue(refreshError, null);
            
            // Clear any user data
            localStorage.removeItem('user');
            
            // Redirect to auth page
            window.location.href = '/auth';
            
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }

    return Promise.reject(error);
});


export default api;

// axiosConfig.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
});

// Only attach token if the URL needs it
axiosInstance.interceptors.request.use(
  (config) => {
    const protectedRoutes = ["/video", "/watchlist"];
    const needsAuth = protectedRoutes.some((route) =>
      config.url?.includes(route)
    );

    if (needsAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

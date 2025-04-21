import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default axiosInstance;

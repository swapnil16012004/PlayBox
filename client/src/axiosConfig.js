import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

console.log("API_URL:", API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

console.log("axios baseurl", axiosInstance.defaults.baseURL);

export default axiosInstance;

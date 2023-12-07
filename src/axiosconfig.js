import axios from "axios";
const baseURL = "http://127.0.0.1:3000";
const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;

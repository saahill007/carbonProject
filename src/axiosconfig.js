import axios from "axios";

const baseURL = "http://18.191.232.91:3000";
// const baseURL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;

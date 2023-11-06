import axios from "axios";

const baseURL = "18.217.86.185";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;

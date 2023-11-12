import axios from "axios";

const baseURL = "http://3.140.241.230:3000";
// const baseURL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;

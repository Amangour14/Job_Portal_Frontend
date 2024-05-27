import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:8080/" });

axiosInstance.interceptors.request.use(
  (config) => {
    const userString = localStorage.getItem("user");
    const users = userString ? JSON.parse(userString) : null;
    const token = users ? users.token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_BASE_URL
      : "/api",
  withCredentials: true, // Enable sending cookies with requests
});

export default axiosInstance;

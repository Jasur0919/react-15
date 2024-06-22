import axios from "axios";
const API_URL = axios.create({
  baseURL: "https://app.olimjanov.uz/v1",
});

API_URL.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API_URL.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Status Code:", error.response.status);
    } else if (error.request) {
      console.error("No Response Received:", error.request);
    } else {
      console.error("Request Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default API_URL;

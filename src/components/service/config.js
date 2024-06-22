import axios from "axios";

const API_URL = axios.create({
  baseURL: "https://app.olimjanov.uz/v1",
});

API_URL.interceptors.request.use((config) => {
  let token = "";
  if (token) {
    config.headers["Authorization"] = token;
  }

  return config;
});

export default API_URL;


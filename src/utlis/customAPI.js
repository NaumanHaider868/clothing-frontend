import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 600000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Accept = "application/json";
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = String(error.config?.url || "");
    const isAuthAttempt = url.includes("/auth/login") || url.includes("/auth/register");
    if (error.response?.status === 401 && !isAuthAttempt) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        const next = `${window.location.pathname}${window.location.search}`;
        window.location.href = `/login?next=${encodeURIComponent(next)}`;
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  get(url) {
    return axiosInstance.get(url);
  },
  post(url, data) {
    return axiosInstance.post(url, data);
  },
  put(url, data) {
    return axiosInstance.put(url, data);
  },
  patch(url, data) {
    return axiosInstance.patch(url, data);
  },
  delete(url) {
    return axiosInstance.delete(url);
  },
};

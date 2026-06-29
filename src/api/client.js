import axios from "axios";

// In production (Vercel), leave VITE_BACKEND_URL empty so requests go to the
// same origin (e.g. /api/...). In local dev, point it to the backend port.
const BASE = import.meta.env.VITE_BACKEND_URL || "";

export const api = axios.create({
  baseURL: BASE,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      if (!window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(err);
  }
);

export const apiError = (err, fallback = "অজানা ত্রুটি") =>
  err?.response?.data?.error || err?.message || fallback;

export default api;

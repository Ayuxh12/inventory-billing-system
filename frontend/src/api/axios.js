import axios from "axios";

// Create a centralized axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Vercel backend URL
});

export default api;

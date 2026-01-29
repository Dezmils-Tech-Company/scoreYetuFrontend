// src/utils/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://scoreyetu-backend.onrender.com", // or your deployed backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

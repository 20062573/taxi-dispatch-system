import axios from "axios";

// custom axios client for all api calls (ref: w3schools.com)
const instance = axios.create({
  baseURL: "https://taxi-dispatch-system.onrender.com/api",
});

// adds token to every request if logged in
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get saved jwt
  if (token) config.headers.Authorization = `Bearer ${token}`; // attach token (ref: ai)
  return config;
});

export default instance; // use this everywhere (ref: w3)

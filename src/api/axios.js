import axios from "axios";

const API = axios.create({
  baseURL: "https://be-project-1-git-main-jeslys-projects-fb6c4fc3.vercel.app/api", 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;

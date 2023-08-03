import axios from "axios";
const BASE_URL = "http://localhost:5050/";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const AxiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

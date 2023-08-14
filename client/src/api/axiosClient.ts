import axios from "axios";
const BASE_URL = "http://localhost:5050/";

export const getToken = () => {
  return localStorage.getItem("token");
};
const token = localStorage.getItem("token");
export const AxiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

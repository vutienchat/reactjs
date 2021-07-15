import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://binshop.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosClientForm = axios.create({
  baseURL: "https://binshop.herokuapp.com/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

import { axiosClient } from "./axiosClient";
import axios from "axios";
const categoryApi = {
  getAll(limit = 0) {
    const url = `/categories?limit=${limit}`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },
  delete(token, categoryId, userId) {
    const url = `https://binshop.herokuapp.com/api/category/${categoryId}/${userId}`;
    return axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
  },
  // delete(id) {
  //     const url = `/category/${id}`;
  //     return axiosClient.delete(url);
  // },
  update(data, token, categoryId, userId) {
    const url = `https://binshop.herokuapp.com/api/category/${categoryId}/${userId}`;
    return axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
  },
  // update(id, category) {
  //     const url = `/category/${id}`;
  //     return axiosClient.put(url, category);
  // },
  add(data, token, id) {
    const url = `https://binshop.herokuapp.com/api/category/${id}`;
    return axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
  },
  //   add(category) {
  //     const url = `/category`;
  //     return axiosClient.post(url, category);
  //   },
};
export default categoryApi;

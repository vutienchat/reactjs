import { axiosClient } from "./axiosClient";
import axios from "axios";
const ProductApi = {
  getAll(pagination = "") {
    // const url = `/products?_expand=category`;
    const url = `/products?${pagination}`;

    return axiosClient.get(url);
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  getRalated(id) {
    const url = `/products/related/${id}`;
    return axiosClient.get(url);
  },
  getseach(seach) {
    const url = `/products?q=${seach}`;
    return axiosClient.get(url);
  },
  countByCategory(id) {
    const url = `/products/countbycategory?categoryId=${id}`;
    return axiosClient.get(url);
  },
  getByKey(data) {
    const url = `products/key?${data}`;
    return axiosClient.get(url);
  },
  getByCategory(id, data = "") {
    const url = `products/categories?categoryId=${id}&${data}`;
    return axiosClient.get(url);
  },
  getSortOrder(a = "") {
    const url = `/products${a}`;
    return axiosClient.get(url);
  },
  add(product, token, userId) {
    const url = `https://binshop.herokuapp.com/api/products/${userId}`;
    return axios.post(url, product, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    });
  },
  // add(data) {
  //     const url = `/products`;
  //     return axiosClientForm.post(url, data);
  // },
  delete(token, productId, userId) {
    const url = `https://binshop.herokuapp.com/api/products/${productId}/${userId}`;
    return axios.delete(url, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    });
  },
  // delete(id) {
  //     const url = `/products/${id}`;
  //     return axiosClient.delete(url);
  // },
  update(product, token, productId, userId) {
    const url = `https://binshop.herokuapp.com/api/products/${productId}/${userId}`;
    return axios.put(url, product, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    });
  },
  // update(id, product) {
  //     const url = `/products/${id}`;
  //     return axiosClientForm.put(url, product);
  // }
};
export default ProductApi;

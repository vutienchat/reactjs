import { axiosClient } from './axiosClient';
const OrderDetailApi = {
  add(data) {
     const url = `/addorderDetail`;
      return axiosClient.post(url,data)
  },
  get(id){
      const url = `/listorderDetail?orderId=${id}`;
      return axiosClient.get(url);
  }
}
export default  OrderDetailApi;
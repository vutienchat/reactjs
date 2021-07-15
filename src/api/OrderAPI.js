import { axiosClient } from './axiosClient';
const OrderAPI = {
    getAll() {
        const url = `/listorder`;
        return axiosClient.get(url);
    },
    add(order) {
        const url = `/addorder`;
        return axiosClient.post(url,order);
    }
}
export default OrderAPI;
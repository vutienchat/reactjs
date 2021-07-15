import { axiosClient } from './axiosClient';
import axios from 'axios';
const UserAPI = {
    login(data) {
        const url = `/signin`;
        return axiosClient.post(url,data);
    },
    add(data) {
        const url = `/signup`;
        return axiosClient.post(url,data);
    },
    signOut() {
        const url = `/signout`;
        return axiosClient.get(url);
    },
    profile(token,id) {
        const url = `http://localhost:4000/api/secret/${id}`
        return axios.get(url,{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
    }

}
export default UserAPI;
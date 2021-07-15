import { axiosClient } from './axiosClient';
const ContactApi = {
    getAll(){
      const url = `/contacts`;
      return axiosClient.get(url)
    },
    add(data){
      const  url = `/contact`;
      return axiosClient.post(url, data);
    },
    delete(id){
        const url = `/contact/${id}`;
        return axiosClient.delete(url);
    }
}
export default ContactApi;
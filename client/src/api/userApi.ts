import { typeLoginReq, typeRegisterReq } from 'src/typings';
import axiosClient from './axiosClient';

const userApi = {
  register: (data: typeRegisterReq) => {
    const url = '/api/auth/signup';
    return axiosClient.post(url, data);
  },

  login: (data: typeLoginReq) => {
    const url = '/api/auth/signin';
    return axiosClient.post(url, data);
  }
};

export default userApi;

import axios from 'axios';
// import queryString from 'query-string';
// import store from './../redux/store';
import Cookies from 'js-cookie';
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL

  // paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  // const userStorage = localStorage.getItem('user');
  // const token = userStorage ? JSON.parse(userStorage).token : null;
  const token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  config.headers['Accept'] = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;

import {
  CreatePostReq,
  typeLoginReq,
  typeRegisterReq
} from 'src/typings';
import axiosClient from './axiosClient';

const apiPost = '/api/post';
const apiComment = '/api/comment';

const postApi = {
  createPost: (data: any) => {
    const url = `${apiPost}/create`;
    return axiosClient.post(url, data);
  },
  deletePost: (data: any) => {
    const url = `${apiPost}/delete`;
    return axiosClient.post(url, data);
  },
  getAll: (page: string) => {
    const url = `${apiPost}/all/${page}`;
    return axiosClient.get(url);
  },
  getMyPost: () => {
    const url = `${apiPost}/my-post`;
    return axiosClient.get(url);
  },
  likePost: (data: { post_id: string }) => {
    const url = `${apiPost}/like`;
    return axiosClient.post(url, data);
  },
  addComment: (data: { post_id: string; text: string }) => {
    const url = `${apiComment}/add`;
    return axiosClient.post(url, data);
  },
  updateComment: (data: { cmt_id: string; text: string }) => {
    const url = `${apiComment}/update`;
    return axiosClient.post(url, data);
  },
  delComment: (data: any) => {
    const url = `${apiComment}/delete`;
    return axiosClient.delete(url, data);
  }
};

export default postApi;

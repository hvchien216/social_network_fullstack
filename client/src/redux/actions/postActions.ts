import {
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  PostActionTypes,
  PostI,
  SHOW_LOADING,
  HIDE_LOADING,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  LIKE_POST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_FAIL,
  SHOW_LOADING_ADD_COMMENT,
  HIDE_LOADING_ADD_COMMENT,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL
} from '../types';

export const fetchListPost = (): PostActionTypes => ({
  type: FETCH_POST
});

export const fetchListPostSuccess = (data: {
  totalPage: number;
  posts: PostI[];
}): PostActionTypes => ({
  type: FETCH_POST_SUCCESS,
  data
});

export const fetchListPostFail = (err: string): PostActionTypes => ({
  type: FETCH_POST_FAIL,
  err
});

export const showLoading = (): PostActionTypes => ({
  type: SHOW_LOADING
});

export const hideLoading = (): PostActionTypes => ({
  type: HIDE_LOADING
});

export const showLoadingAddComment = (): PostActionTypes => ({
  type: SHOW_LOADING_ADD_COMMENT
});

export const hideLoadingAddComment = (): PostActionTypes => ({
  type: HIDE_LOADING_ADD_COMMENT
});

export const addPost = (data: any): PostActionTypes => ({
  type: ADD_POST,
  data
});

export const addPostSuccess = (data: PostI): PostActionTypes => ({
  type: ADD_POST_SUCCESS,
  data
});

export const addPostFail = (err: string): PostActionTypes => ({
  type: ADD_POST_FAIL,
  err
});

export const deletePost = (postId: string): PostActionTypes => ({
  type: DELETE_POST,
  postId
});

export const deletePostSuccess = (
  postId: string
): PostActionTypes => ({
  type: DELETE_POST_SUCCESS,
  postId
});

export const deletePostFail = (err: string): PostActionTypes => ({
  type: DELETE_POST_FAIL,
  err
});

export const likePost = (postId: string): PostActionTypes => ({
  type: LIKE_POST,
  postId
});

export const likePostSuccess = (post: PostI): PostActionTypes => ({
  type: LIKE_POST_SUCCESS,
  post
});

export const likePostFail = (err: string): PostActionTypes => ({
  type: LIKE_POST_FAIL,
  err
});

export const addComment = (data: {
  post_id: string;
  text: string;
}): PostActionTypes => ({
  type: ADD_COMMENT,
  data
});

export const addCommentSuccess = (post: PostI): PostActionTypes => ({
  type: ADD_COMMENT_SUCCESS,
  post
});

export const addCommentFail = (err: string): PostActionTypes => ({
  type: ADD_COMMENT_FAIL,
  err
});

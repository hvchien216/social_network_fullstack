export interface UIFromReducer {
  openModal: boolean;
  theme: string;
}

export interface PostI {
  likes: [];
  comments: {
    _id: string;
    text: string;
    userId: {
      name: string;
      avatar: string;
    };
  }[];
  _id: string;
  text: string;
  photo: string;
  postedBy: {
    _id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
}

export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

export const SHOW_LOADING_ADD_COMMENT = 'SHOW_LOADING_ADD_COMMENT';
export const HIDE_LOADING_ADD_COMMENT = 'HIDE_LOADING_ADD_COMMENT';

export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAIL = 'FETCH_POST_FAIL';

export const ADD_POST = 'ADD_POST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL';

export const LIKE_POST = 'LIKE_POST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAIL = 'LIKE_POST_FAIL';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAIL = 'ADD_COMMENT_FAIL';

export interface showLoadingAction {
  type: typeof SHOW_LOADING;
}

export interface hideLoadingAction {
  type: typeof HIDE_LOADING;
}

export interface showLoadingAddCommentAction {
  type: typeof SHOW_LOADING_ADD_COMMENT;
}

export interface hideLoadingAddCommentAction {
  type: typeof HIDE_LOADING_ADD_COMMENT;
}

export interface fetchPostAction {
  type: typeof FETCH_POST;
}

export interface fetchPostSuccessAction {
  type: typeof FETCH_POST_SUCCESS;
  data: {
    totalPage: number;
    posts: PostI[];
  };
}

export interface fetchPostFailAction {
  type: typeof FETCH_POST_FAIL;
  err: string;
}

export interface addPostAction {
  type: typeof ADD_POST;
  data: {
    text: string;
    file?: any;
  };
}

export interface addPostSuccessAction {
  type: typeof ADD_POST_SUCCESS;
  data: PostI;
}

export interface addPostFailAction {
  type: typeof ADD_POST_FAIL;
  err: string;
}

export interface deletePostAction {
  type: typeof DELETE_POST;
  postId: string;
}

export interface deletePostSuccessAction {
  type: typeof DELETE_POST_SUCCESS;
  postId: string;
}

export interface deletePostFailAction {
  type: typeof DELETE_POST_FAIL;
  err: string;
}

export interface likePostAction {
  type: typeof LIKE_POST;
  postId: string;
}

export interface likePostSuccessAction {
  type: typeof LIKE_POST_SUCCESS;
  post: PostI;
}

export interface likePostFailAction {
  type: typeof LIKE_POST_FAIL;
  err: string;
}

export interface addCommentAction {
  type: typeof ADD_COMMENT;
  data: { post_id: string; text: string };
}

export interface addCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS;
  post: PostI;
}

export interface addCommentFailAction {
  type: typeof ADD_COMMENT_FAIL;
  err: string;
}

export type PostActionTypes =
  | fetchPostAction
  | fetchPostSuccessAction
  | fetchPostFailAction
  | showLoadingAction
  | hideLoadingAction
  | addPostAction
  | addPostSuccessAction
  | addPostFailAction
  | likePostAction
  | likePostSuccessAction
  | likePostFailAction
  | addCommentAction
  | addCommentSuccessAction
  | addCommentFailAction
  | showLoadingAddCommentAction
  | hideLoadingAddCommentAction
  | deletePostAction
  | deletePostSuccessAction
  | deletePostFailAction;

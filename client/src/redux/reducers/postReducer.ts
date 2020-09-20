import { NumberLocale } from 'yup';
import { fetchListPost } from '../actions/postActions';
import {
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  PostActionTypes,
  PostI,
  ADD_POST_FAIL,
  ADD_POST,
  ADD_POST_SUCCESS,
  SHOW_LOADING,
  HIDE_LOADING,
  LIKE_POST_FAIL,
  LIKE_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  SHOW_LOADING_ADD_COMMENT,
  HIDE_LOADING_ADD_COMMENT,
  DELETE_POST_SUCCESS
} from '../types';
export type PostStateType = {
  loadingNewComent: boolean;
  loading: boolean;
  listPost: PostI[];
  pageCurrent: number;
  totalPage: number;
};
const initialState: PostStateType = {
  loadingNewComent: false,
  loading: false,
  listPost: [],
  pageCurrent: 1,
  totalPage: 1
};

export default function (
  state = initialState,
  action: PostActionTypes
): PostStateType | [] {
  switch (action.type) {
    case SHOW_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case HIDE_LOADING: {
      return {
        ...state,
        loading: false
      };
    }
    case SHOW_LOADING_ADD_COMMENT: {
      return {
        ...state,
        loadingNewComent: true
      };
    }
    case HIDE_LOADING_ADD_COMMENT: {
      return {
        ...state,
        loadingNewComent: false
      };
    }
    // case FETCH_POST: {
    //   return {
    //     ...state,
    //     listPost: []
    //   };
    // }
    case FETCH_POST_SUCCESS: {
      const {
        data: { totalPage, posts }
      } = action;
      let newList: any = [...state.listPost, ...posts];
      return {
        ...state,
        totalPage,
        pageCurrent: Number(state.pageCurrent) + 1,
        listPost: newList
      };
    }
    case FETCH_POST_FAIL:
    case ADD_POST_FAIL:
    case LIKE_POST_FAIL:
    case ADD_COMMENT_FAIL: {
      return {
        ...state
        // listPost: []
      };
    }
    // case ADD_POST: {
    //   return { ...state };
    // }
    case ADD_POST_SUCCESS: {
      const { data } = action;
      let newPostList: any = [...state.listPost];
      newPostList.unshift(data);
      return {
        ...state,
        listPost: newPostList
      };
    }
    case LIKE_POST_SUCCESS: {
      const { post } = action;
      const { listPost } = state;
      const index = listPost.findIndex(
        (item) => item._id === post._id
      );
      if (index !== -1) {
        const newList = [
          ...listPost.slice(0, index),
          post,
          ...listPost.slice(index + 1)
        ];
        return {
          ...state,
          listPost: newList
        };
      }
      return {
        ...state
      };
    }
    case ADD_COMMENT_SUCCESS: {
      const { post } = action;
      const { listPost } = state;
      const index = listPost.findIndex(
        (item) => item._id === post._id
      );
      if (index !== -1) {
        const newList = [
          ...listPost.slice(0, index),
          post,
          ...listPost.slice(index + 1)
        ];
        return {
          ...state,
          listPost: newList
        };
      }
      return {
        ...state
      };
    }
    case DELETE_POST_SUCCESS: {
      const { postId } = action;
      const newListPost = [...state.listPost].filter(
        (e) => e._id !== postId
      );
      return {
        ...state,
        listPost: newListPost
      };
    }
    default:
      return state;
  }
}

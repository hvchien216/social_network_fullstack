import { call, delay, put, select, take } from 'redux-saga/effects';
import postApi from '@/api/postApi';

import {
  addCommentFail,
  addCommentSuccess,
  addPostFail,
  addPostSuccess,
  deletePostFail,
  deletePostSuccess,
  fetchListPostFail,
  fetchListPostSuccess,
  hideLoading,
  hideLoadingAddComment,
  likePostFail,
  likePostSuccess,
  showLoading,
  showLoadingAddComment
} from '@/redux/actions/postActions';
import { FETCH_POST } from '@/redux/types';
import { CreatePostReq } from '../typings';

export function* fetchListPostSaga() {
  while (true) {
    const pageCrt = yield select((state) => state.post.pageCurrent);
    yield take(FETCH_POST);

    yield put(showLoading());
    try {
      const { success, message, posts, totalPage } = yield call(
        postApi.getAll,
        pageCrt
      );
      const data = {
        posts,
        totalPage
      };
      if (success) {
        yield put(fetchListPostSuccess(data));
      } else {
        yield put(fetchListPostFail(message));
      }
    } catch (err) {
      yield put(fetchListPostFail(err));
    }
    delay(250);
    yield put(hideLoading());
  }
}

export function* addPostSaga({ data }: any) {
  yield put(showLoading());
  try {
    const { success, message, post } = yield call(
      postApi.createPost,
      data
    );
    yield put(addPostSuccess(post));
  } catch (err) {
    yield put(addPostFail(err));
  }
  delay(250);
  yield put(hideLoading());
}

export function* likePostSaga({ postId }: any) {
  yield put(showLoading());
  try {
    const data: { post_id: string } = {
      post_id: postId
    };
    const { success, message, post } = yield call(
      postApi.likePost,
      data
    );
    if (success) {
      yield put(likePostSuccess(post));
    } else {
      yield put(likePostFail(message));
    }
  } catch (err) {
    yield put(likePostFail(err));
  }
  delay(250);
  yield put(hideLoading());
}

export function* addCommentSaga({ data }: any) {
  yield put(showLoadingAddComment());
  try {
    const { success, message, post } = yield call(
      postApi.addComment,
      data
    );
    if (success) {
      yield put(addCommentSuccess(post));
    } else {
      yield put(addCommentFail(message));
    }
  } catch (err) {
    yield put(addCommentFail(err));
  }
  delay(250);
  yield put(hideLoadingAddComment());
}

export function* deleteCommentSaga({ postId }: any) {
  yield put(showLoading());
  try {
    const data: { post_id: string } = {
      post_id: postId
    };
    const { success, message } = yield call(postApi.deletePost, data);
    if (success) {
      yield put(deletePostSuccess(postId));
    } else {
      yield put(deletePostFail(message));
    }
  } catch (err) {
    yield put(deletePostFail(err));
  }
  delay(250);
  yield put(hideLoading());
}

import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  FETCH_POST,
  LIKE_POST
} from '@/redux/types';
import { all, takeLatest, fork, takeEvery } from 'redux-saga/effects';
import {
  addCommentSaga,
  addPostSaga,
  deleteCommentSaga,
  fetchListPostSaga,
  likePostSaga
} from './postSaga';

function* rootSaga() {
  // yield fork(watchFetchListTaskAction);
  // yield takeLatest(FILTER_TASK, filterTaskSaga);
  // yield takeEvery(ADD_TASK, addTaskSaga)
  // yield takeEvery(UPDATE_TASK, updateTaskSaga)
  // yield takeEvery(DELETE_TASK, deleteTaskSaga)
  // yield takeEvery(LOGIN, loginUserSaga)
  // yield takeEvery(REGISTER, registerUserSaga)
  return yield all([
    fork(fetchListPostSaga),
    takeLatest(ADD_POST, addPostSaga),
    takeEvery(LIKE_POST, likePostSaga),
    takeLatest(ADD_COMMENT, addCommentSaga),
    takeLatest(DELETE_POST, deleteCommentSaga)
  ]);
}

export default rootSaga;

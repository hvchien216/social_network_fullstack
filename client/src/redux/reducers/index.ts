import { combineReducers } from 'redux';
import post from '@/redux/reducers/postReducer';
import ui from '@/redux/reducers/uiReducer';

const rootReducer = combineReducers({
  post
  // ui
});

export default rootReducer;

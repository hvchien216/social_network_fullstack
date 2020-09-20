// import {
//   LOGIN,
//   LOGIN_SUCCESS,
//   LOGIN_FAILED,
//   REGISTER,
//   REGISTER_SUCCESS,
//   REGISTER_FAILED,
//   LOGOUT
// } from './../types';
// import { toastError } from '../../helpers/toastHelper';
import * as types from '@/redux/types';
const initialState = {
  darkMode: false
  // user: JSON.parse(localStorage.getItem('user')) || {},
  // authenticated: JSON.parse(localStorage.getItem('user')) ? true : false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case types.TOGGLE_DARK_MODE: {
      return {
        ...state,
        darkMode: !state.darkMode
      };
    }
    // case LOGIN_SUCCESS: {
    //   const { data } = action.payload;
    //   return {
    //     ...state,
    //     loading: false,
    //     user: { user: data },
    //     authenticated: true,
    //   }
    // }
    // case LOGIN_FAILED:
    // case REGISTER_FAILED: {
    //   const { err } = action.payload;
    //   toastError(err)
    //   return {
    //     ...state,
    //     loading: false
    //   }
    // }
    // case LOGOUT:
    // case REGISTER_SUCCESS: {
    //   return {
    //     ...state,
    //     loading: false,
    //     user: {},
    //     authenticated: false,
    //   }
    // }
    default:
      return state;
  }
}

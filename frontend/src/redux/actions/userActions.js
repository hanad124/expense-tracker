import {
  GET_USER_INFO,
  REMOVE_USER_INFO,
  GET_USER_NAME,
} from "../constants/userConstants";

export const getUserDetails = (user) => (dispatch) => {
  dispatch({
    type: GET_USER_INFO,
    payload: user,
  });
};

// get user name
export const getUserName = (user) => (dispatch) => {
  dispatch({
    type: GET_USER_NAME,
    payload: user,
  });
};

export const removeUserInfo = () => (dispatch) => {
  dispatch({
    type: REMOVE_USER_INFO,
  });
};

import {
  GET_USER_INFO,
  REMOVE_USER_INFO,
  GET_USER_NAME,
} from "../constants/userConstants";

export const getUserInfoReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        user: action.payload,
      };

    case REMOVE_USER_INFO:
      return {
        user: {},
      };
    default:
      return state;
  }
};

// get user name
export const getUserNameReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_NAME:
      return {
        user: action.payload,
      };

    default:
      return state;
  }
};

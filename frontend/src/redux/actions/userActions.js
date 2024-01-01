import { GET_USER_INFO, REMOVE_USER_INFO } from "../constants/userConstants"



export const getUserDetails = (user) => (dispatch) => {
    dispatch({
          type: GET_USER_INFO,
          payload: user
    })
  }
  
  export const removeUserInfo = () => (dispatch) => {
    dispatch({
          type: REMOVE_USER_INFO,
    })
  }
  
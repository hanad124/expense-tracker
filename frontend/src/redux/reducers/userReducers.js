import { GET_USER_INFO, REMOVE_USER_INFO } from "../constants/userConstants"


export const getUserInfoReducer = (state={user:{}},action)=>{
    switch(action.type){
        case GET_USER_INFO:
            return {
                user:action.payload
            }
        case REMOVE_USER_INFO:
            return {
                user:{}
            }
        default:
            return state
    }
}
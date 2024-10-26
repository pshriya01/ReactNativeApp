import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS } from "../ActionTypes/ActionTypes"

export const getusersrequest=()=>{
    return {type: GET_USERS_REQUEST}
}

export const getuserssuccces = (users)=>{
   return { type: GET_USERS_SUCCESS, payload: users }
}

export const getuserfailure = (error)=>{
   return { type: GET_USERS_FAILURE, payload: error }
}

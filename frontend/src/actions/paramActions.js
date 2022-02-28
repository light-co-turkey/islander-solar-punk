import axios from "axios";

import { SET_PARAM_IS_LOADED, SET_USERS_LIST } from "./types";

export const getAllUsers = () => dispatch => {
    dispatch(setParamIsLoaded(false))
    axios
        .get("/api/users/get_all_users")
        .then(res => {
            localStorage.setItem("usersList", JSON.stringify(res.data))
            dispatch(setAllUsers(res.data))
            dispatch(setParamIsLoaded(false))
        })
}

export const nestUserPI = y => dispatch => {
    const { usersList, createdBy, medias } = y
    dispatch(setAllUsers(usersList.map(x => (x._id === createdBy ?
        { ...x, mediaBuffer: medias.mediaBuffer, mediaType: medias.mediaType } : x))))
}

export const setParamIsLoaded = x => {
    return {
        type: SET_PARAM_IS_LOADED,
        payload: x
    }
}

//Set All User
export const setAllUsers = x => {
    return {
        type: SET_USERS_LIST,
        payload: x
    }
}
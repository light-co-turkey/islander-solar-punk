import axios from "axios";

import * as types from "./types";

export const getAllUsers = () => dispatch => {
    dispatch(setParamIsLoaded(false))
    axios
        .get("/api/users/get_all_users")
        .then(res => {

            Promise.resolve(localStorage.setItem("usersList", JSON.stringify(res.data)))
                .then(() => Promise.resolve(dispatch(setAllUsers(res.data)))
                    .then(() =>
                        dispatch(setParamIsLoaded(true))
                    )
                )
        })
}

export const handleUserCheck = x => async dispatch => {
    const { usersList, createdBy } = x
    let userId = createdBy
    let userIsLocalData = usersList.filter(x => x._id === createdBy)[0]
    dispatch(setParamIsLoaded(false))
    let handleToggle = x => {
        if (!x) {
            let promise = axios.get(`/api/users/get_user/${userId}`)
            let dataPromise = promise
                .then(res => {
                    dispatch(addToUsersList(res.data))
                    dispatch(setParamIsLoaded(true))
                    return res.data
                })
            return dataPromise
        } else {
            dispatch(setParamIsLoaded(true))
            return x
        }

    }
    return await Promise.resolve(handleToggle(userIsLocalData))
}


export const nestUserPI = y => dispatch => {
    const { usersList, createdBy, medias } = y
    dispatch(setAllUsers(usersList.map(x => (x._id === createdBy ?
        { ...x, mediaBuffer: medias.mediaBuffer, mediaType: medias.mediaType, uPIId: medias.id } : x))))
}

export const setParamIsLoaded = x => {
    return {
        type: types.SET_PARAM_IS_LOADED,
        payload: x
    }
}

export const addToUsersList = x => {
    return {
        type: types.ADD_TO_USERS_LIST,
        payload: x
    }
}

//Set All User
export const setAllUsers = x => {
    return {
        type: types.SET_USERS_LIST,
        payload: x
    }
}
import axios from "axios"
import { nestUserPI, setAllUsers } from "./paramActions"
import { setUserIsLoaded, setUserProps } from "./userActions"

export const postImage = x => dispatch => {
    const { mediaEncode, mediaType, usageType, createdBy, setIsLoaded } = x
    dispatch(setUserIsLoaded(false))
    axios.post(`/api/medias/post_image`, {
        mediaEncode,
        mediaType,
        usageType,
        createdBy
    })
        .then(() => {
            setIsLoaded(true)
            if (usageType === "userPI") {
                let newProps = { field: "pILoaded", prop: true }
                dispatch(setUserProps(newProps))
                dispatch(setUserIsLoaded(true))
            }

        })
        .catch(err => console.log(err))
}

export const getMedia = x => dispatch => {
    const { usageType, createdBy, usersList } = x
    let promise = axios.get(`/api/medias/get_media/${createdBy}/${usageType}`, {})
    let dataPromise =
        promise.then(res => {
            let medias = res.data.medias[0]
            if (usageType === "userPI") {
                dispatch(nestUserPI({ usersList, medias, createdBy }))
            }
            return res.data.medias[0]
        })
            .catch(err => console.log(err))

    return dataPromise
}

// Delete Media
export const deleteMedia = (x) => {
    axios.post(`/api/medias/remove_media/${x}`)
        .then((res) => {
            return res.json(true)
        });
};
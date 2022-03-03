import axios from "axios";

import * as types from "./types";

// Post Post
export const submitPost = (createdBy, draftJsRaw, setCount) => dispatch => {
    dispatch(setPostsIsLoaded(false))
    axios.post(`/api/posts/createpost`, { draftJsRaw, createdBy })
        .then(res => {
            dispatch(addToPosts(res.data))
            dispatch(setPostsIsLoaded(true))
            setCount(1)
        })
        .catch(err => {
            return {
                type: types.GET_ERRORS,
                payload: err
            }
        });
};

export const getPost = x => dispatch => {
    let postId = x
    dispatch(setPostsIsLoaded(false))
    axios
        .get(`/api/posts/get_post/${postId}`)
        .then(res => {
            let data = res.data
            dispatch(addToPosts(data))
            dispatch(setPostsIsLoaded(true))
        })
};

// Post Post
export const getAllPost = x => dispatch => {
    dispatch(setPostsIsLoaded(false))
    axios.get(`/api/posts/allpost`)
        .then(res => {
            dispatch(setPosts(res.data.posts));
            dispatch(setPostsIsLoaded(true))
        })
        .catch(err => console.log(err));
};

// Post Post
export const editPost = postData => (dispatch) => {
    axios.post(`/api/posts/editpost/${postData.id}`, postData)
        .then((res) => {
            dispatch(getAllPost());
        })
        .catch(err => console.log(err));
};

// Delete Post
export const deletePost = (id, list, history) => dispatch => {
    axios.post(`/api/posts/deletepost/${id}`)
        .then((res) => {
            const newData = list.filter((item) => {
                return item._id !== res.data;
            });
            dispatch(setPosts(newData));
            history.push("/")
        });
};

//Set Is Loaded
export const setPostsIsLoaded = e => {
    return {
        type: types.SET_POSTS_IS_LOADED,
        payload: e
    }
}

//Set Is Loaded
export const setPosts = e => {
    return {
        type: types.SET_POSTS,
        payload: e
    }
}

//Set Is Loaded
export const addToPosts = e => {
    return {
        type: types.ADD_TO_POSTS,
        payload: e
    }
}
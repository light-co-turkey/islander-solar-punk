import axios from "axios";

import { SET_POSTS_IS_LOADED, SET_POSTS, GET_ERRORS } from "./types";

// Post Post
export const submitPost = x => dispatch => {
    dispatch(setPostsIsLoaded(false))
    axios.post(`/api/posts/createpost`, { draftJsRaw: x.draftJsRaw, createdBy: x.createdBy })
        .then(res => 
            dispatch(getAllPost())
            /* dispatch(setPostsIsLoaded(true)) */)
            .catch(err => console.log(err) );
};

// Post Post
export const getAllPost = x => dispatch => {
    dispatch(setPostsIsLoaded(false))
    axios.get(`/api/posts/allpost`)
        .then(res => {
            dispatch(setPosts(res.data.posts));
            dispatch(setPostsIsLoaded(true))
        })
        .catch(err => console.log(err) );
};

// Post Post
export const editPost = postData => (dispatch) => {
    axios.post(`/api/posts/editpost/${postData.id}`, postData)
        .then((res) => {
            dispatch(getAllPost());
        })
        .catch(err => console.log(err) );
};

// Delete Post
export const deletePost = (x) => dispatch => {
    axios.post(`/api/posts/deletepost/${x.id}`)
      .then((res) => {
        const newData = x.posts.filter((item) => {
          return item._id !== res.data;
        });
        dispatch(setPosts(newData));
      });
  };

//Set Is Loaded
export const setPostsIsLoaded = e => {
    return {
        type: SET_POSTS_IS_LOADED,
        payload: e
    }
}

//Set Is Loaded
export const setPosts = e => {
    return {
        type: SET_POSTS,
        payload: e
    }
}
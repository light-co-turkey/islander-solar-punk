import {
  SET_POSTS_IS_LOADED, SET_POSTS
} from "../actions/types";

const initialState = {
  isLoaded: false,
  posts: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_POSTS_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload == null ? [] : action.payload
      };
    default:
      return state;
  }
}

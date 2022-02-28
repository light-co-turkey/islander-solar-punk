import {
  SET_PARAM_IS_LOADED, SET_USERS_LIST
} from "../actions/types";

let usersList = localStorage.usersList == null ? [] : JSON.parse(localStorage.usersList)

const initialState = {
  isLoaded: false,
  usersList: usersList
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PARAM_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload
      };
    case SET_USERS_LIST:
      return {
        ...state,
        usersList: action.payload
      };
    default:
      return state;
  }
}

import { SET_CURRENT_USER, USER_IS_LOADED } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {
    id: ""
  },
  isLoaded: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_IS_LOADED:
      return {
        ...state,
        isLoaded: true
      };
    default:
      return state;
  }
}

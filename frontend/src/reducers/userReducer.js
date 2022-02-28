import {
  SET_USER_IS_LOADED, SET_USER, SET_USER_PROPS
} from "../actions/types";

const initialState = {
  isLoaded: false,
  raw: {},
  props: {
    pILoaded: false
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload
      };
    case SET_USER:
      return {
        ...state,
        raw: action.payload,
      };
    case SET_USER_PROPS:
      return {
        ...state,
        props: {
          ...state.props,
          [action.payload.field]: action.payload.prop
        }
      };
    default:
      return state;
  }
}

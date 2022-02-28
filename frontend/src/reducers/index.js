import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import paramReducer from "./paramReducer";

export default combineReducers({
  param: paramReducer,
  user: userReducer,
  post: postReducer,
  auth: authReducer,
  errors: errorReducer
});

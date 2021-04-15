import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import recipeReducer from "../reducers/recipesReducer";
import menuReducer from "./menuReducer";
import userReducer from "./userReducer";
import loadReducer from "./loadReducer";

export default combineReducers({
  userReducer,
  recipeReducer,
  menuReducer,
  loadReducer,
  form: formReducer,
});

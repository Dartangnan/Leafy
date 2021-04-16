import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import recipeReducer from "../reducers/recipesReducer";
import menuReducer from "./menuReducer";
import userReducer from "./userReducer";

export default combineReducers({
  userReducer,
  recipeReducer,
  menuReducer,
  form: formReducer,
});

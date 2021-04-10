import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import recipeReducer from "../reducers/recipesReducer";
import menuReducer from "./menuReducer";

export default combineReducers({
  recipeReducer,
  menuReducer,
  form: formReducer,
});

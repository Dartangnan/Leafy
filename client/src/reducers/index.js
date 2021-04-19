import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import recipeReducer from "../reducers/recipesReducer";
import menuReducer from "./menuReducer";
import userReducer from "./userReducer";
import ingredientReducer from "./ingredientsReducer";

export default combineReducers({
  ingredientList: ingredientReducer,
  userReducer,
  recipeReducer,
  menuReducer,
  form: formReducer,
});

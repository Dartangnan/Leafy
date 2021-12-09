import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import recipeReducer from "../reducers/recipesReducer";
import menuReducer from "./menuReducer";
import userReducer from "./userReducer";
import ingredientReducer from "./ingredientsReducer";
import dateReducer from "./dateReducer";

export default combineReducers({
  ingredientList: ingredientReducer,
  todayMilliSec: dateReducer,
  userReducer,
  recipeReducer,
  menuReducer,
  form: formReducer,
});

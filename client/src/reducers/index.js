import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import recipeReducer from "../reducers/recipesReducer";

export default combineReducers({
  recipeReducer,
  form: formReducer,
});
